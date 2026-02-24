using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.RedisCache;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Business.Manager {
	public class ClientManager : BusinessBase<Client, string?> {
		readonly PackageCodeManager PackageCodeManager;
		readonly AccountGroupManager AccountGroupManager;
		readonly SignalRManager SignalRManager;
		readonly BookQuizManager BookQuizManager;
		readonly BookQuizAnswerManager BookQuizAnswerManager;
		readonly ClientBookManager ClientBookManager;
		readonly OfficerManager OfficerManager;
		readonly CompanyManager CompanyManager;
		public static int _passwordRenewValidTimeInMinutes = 3;
		const string _minus = "-", _client = "client";
		public ClientManager(
			PackageCodeManager packageCodeManager,
			AccountGroupManager accountGroupManager,
			SignalRManager signalRManager,
			BookQuizManager bookQuizManager,
			BookQuizAnswerManager bookQuizAnswerManager,
			ClientBookManager clientBookManager,
			OfficerManager officerManager,
			CompanyManager companyManager
			) {
			PackageCodeManager = packageCodeManager;
			AccountGroupManager = accountGroupManager;
			SignalRManager = signalRManager;
			BookQuizManager = bookQuizManager;
			BookQuizAnswerManager = bookQuizAnswerManager;
			ClientBookManager = clientBookManager;
			OfficerManager = officerManager;
			CompanyManager = companyManager;
		}

		async Task<PackageCode> ActivateCode(string code, Client obj) {
			Database db = new();
			db.AddParameter(obj.Email);
			var emailCheck = await db.Execute<EmailCheckDto>("web", "checkemail", true);
			if(emailCheck?.HasEmail ?? false)
				throw new MyException("Bu e-posta kullanılıyor");
			PackageCode? packageCode = null;
			try {
				packageCode = (await PackageCodeManager.Get(code, true));
			}
			catch(Exception ex) {
				Core.Logging.LogKeeper.LogError(ex.Message);
			}
			if(packageCode == null)
				throw new MyException("Aktivasyon kodu geçerli değil");
			if(packageCode.IsHidden)
				throw new MyException("Aktivasyon kodu kullanılamaz");
			if(packageCode.IsLocked || !string.IsNullOrEmpty(packageCode.ClientId))
				throw new MyException("Aktivasyon kodu daha önce aktifleştirilmiş");
			//var package = await PackageManager.Get(packageCode.PackageId, true);
			//if(package == null)
			//	throw new MyException("Aktivasyon kodu geçersiz");
			//if(package.Level != obj.AccountGroupLevelName)
			//	throw new MyException("Aktivasyon kodu " + Convert.ToInt32(obj.AccountGroupLevelName) + ". sınıflar için uygun değil");
			//if(package.IsHidden)
			//	throw new MyException("Aktivasyon kodu kullanılamaz");
			DateTime now = DateTime.Now;
			if(packageCode.CreateDateTime?.AddYears(1) < now)
				throw new MyException("Eski bir aktivasyon kodu girdiniz");
			//packageCode.Package = package;
			return packageCode;
		}

		public async Task<List<ClientEvent>?> GetAllEvents(string clientId) {
			var accountGroupId = (await this.Get(clientId))?.AccountGroupId;
			var officerId = (await AccountGroupManager.Get(accountGroupId))?.OfficerId;
			var allEvents = (await BookQuizManager.Filter(new List<FilterCondition> {
				new FilterCondition {
					ColumnName = "OfficerId",
					Value = officerId
				},
				new FilterCondition {
					ColumnName = "Flags",
					Operator = "!&",
					Value = "128"
				}
			}))?.Data;
			List<ClientEvent>? result = null;
			if(allEvents?.Any() ?? false) {
				var progress = (await ClientBookManager.Filter(new List<FilterCondition> {
					new FilterCondition {
						ColumnName = "ClientId",
						Value = clientId
					}
				}))?.Data;
				var eventsDone = (await BookQuizAnswerManager.Filter(new List<FilterCondition> {
					new FilterCondition {
						ColumnName = "ClientId",
						Value = clientId
					}
				}))?.Data;
				result = new();
				foreach(var item in allEvents) {
					var r = result.FirstOrDefault(x => x.BookId == item.BookId);
					var p = progress?.FirstOrDefault(x => x.BookId == item.BookId);
					if(p == null || string.IsNullOrEmpty(p.OfficerId))
						continue;
					if(r != null) {
						r.Max++;
						r.CreateDateTime = item.CreateDateTime;
					}
					else {
						result.Add(new ClientEvent {
							Id = p.Id.ToString(),
							BookId = item.BookId,
							CreateDateTime = item.CreateDateTime,
							Max = 1,
							RightCount = 0,
							WrongCount = 0,
							Current = 0,
							ReadDone = (p?.Progress >= 100)
						});
						r = result[^1];
					}
					var c = eventsDone?.FirstOrDefault(x => x.BookQuizId == item.Id.ToString());
					if(c != null) {
						r.Current++;
						if(c.RightAnswered)
							r.RightCount++;
						else
							r.WrongCount++;
					}
				}
			}
			result = result?.OrderBy(x => x.ReadDone ? 0 : 1).
				ThenByDescending(x => x.Max - x.Current)?.ThenByDescending(x => x.CreateDateTime).ToList();
			return result;
		}

		public async Task<Client> GetClient(string id) {
			var client = await base.Get(id);
			var accountGroup = await AccountGroupManager.Get(client.AccountGroupId);
			string className = string.Empty;
			if(int.TryParse(accountGroup.Level, out int lvl))
				className += lvl.ToString();
			else
				className += accountGroup.Level;
			className += " - " + accountGroup.Name;
			client.AccountGroupName = className;
			client.TeacherName = (await OfficerManager.Get(accountGroup.OfficerId)).Name;
			client.CompanyName = (await CompanyManager.Get(accountGroup.CompanyId)).Name;
			return client;
		}
		public async Task<bool> ActivateAccount(Client obj, string activationCode) {
			if(!string.IsNullOrEmpty(activationCode)) {
				var packageCode = await ActivateCode(activationCode, obj);
				if(packageCode != null) {
					List<FilterCondition> accountGroupFilters = new();
					accountGroupFilters.Add(new FilterCondition {
						ColumnName = "Level",
						Value = obj.AccountGroupLevelName
					});
					accountGroupFilters.Add(new FilterCondition {
						ColumnName = "Name",
						Value = obj.AccountGroupName
					});
					accountGroupFilters.Add(new FilterCondition {
						ColumnName = "CompanyId",
						Value = packageCode.CompanyId
					});
					var accountGroup = (await AccountGroupManager.Filter(accountGroupFilters, 1, 1))?.Data?.FirstOrDefault();
					if(accountGroup == null)
						throw new MyException("Sınıf şubesi bulunamadı");
					var client = (await base.Filter(new List<FilterCondition> { 
						new FilterCondition { ColumnName = "Code", Value = obj.Code },
						new FilterCondition {
							ColumnName = "CompanyId",
							Value = packageCode.CompanyId
						}
					}, 1, 1))?.Data?.FirstOrDefault();
					if(client == null)
						throw new MyException("Bu okul numarası ile bir öğrenci kaydı bulunamadı");
					if(client != null && !string.IsNullOrEmpty(client.ActivationCode))
						throw new MyException("Bu okul numarası adına daha önce hesap aktif edilmiş");
					obj.Id = client.Id;
					obj.CompanyId = client.CompanyId;
					obj.Name = null;
					obj.AccountGroupId = null;
					obj.UserName = obj.Email;
					obj.ExpireDateTime = DateTime.Now.AddYears(1);
					obj.ActivationCode = activationCode;
					obj.Flags = client.Flags;
					obj.Flags ??= 0;
					if((obj.Flags & 64) == 0)
						obj.Flags += 64;
					//obj.PackageId = packageCode.PackageId;
					Database? tran = null;
					try {
						tran = new(true);
						obj = await this.Edit(obj, dBWithTran: tran, doNotCommit: true);
						packageCode.Flags = (short?)((packageCode.Flags ?? 0) + 64);
						packageCode.ClientId = obj.Id;
						packageCode = await PackageCodeManager.Edit(packageCode, dBWithTran: tran, doNotCommit: true);
						await tran.EndTransaction();
					}
					catch(MyException mex) {
						if(tran != null)
							await tran.EndTransaction(false);
						throw mex;
					}
					catch {
						if(tran != null)
							await tran.EndTransaction(false);
						throw;
					}
					bool result = packageCode?.Updated ?? false;
					if(result) {
						await SignalRManager.InvokeSignal(packageCode.CompanyId, _client, new Notification {
							Message = obj.Code + " okul numaralı öğrenci hesabını aktifleştirdi",
							Parameters = "id=" + obj.Id
						});
					}
					return result;
				}
			}
			else {
				
			}
			return false;
		}
		public static async Task<Client> CheckEmail(string userName, string email) {
			Database db = new();
			db.AddParameter(userName);
			db.AddParameter(email);
			var result = await db.Execute<Client>("login", _client + "emailcheck");
			if(result == null)
				return new Client { Flags = 128 };
			return result;
		}
		public static async Task<Client> CheckOnlyEmail(string email) {
			Database db = new();
			db.AddParameter(email);
			var result = await db.Execute<Client>("login", _client + "emailexistcheck");
			if(result == null)
				return new Client { Flags = 128 };
			return result;
		}
		public static async Task<bool> EditUserPassword(string email, string newPassword) {
			Database db = new();
			db.AddParameter(_client);
			db.AddParameter(email);
			db.AddParameter(newPassword);
			bool success = ((await db.Execute<DBReturnObject<int>>("login", "updatepassword", true))?.Data ?? 0) > 0;
			if(success)
				ChangeResetPasswordCode(email);
			return success;
		}
		public static string? GetCodeForNewPassword(string email) {
			return MyCacheDB.GetCache(email + _minus + _client);
		}
		static string GetCode() {
			return Guid.NewGuid().ToString().Replace(_minus, string.Empty)[..12].ToUpper();
		}
		static async Task SetCache(string email, string code, TimeSpan? ts = null) {
			await MyCacheDB.SetCache(email + _minus + _client, code, ts ?? TimeSpan.FromMinutes(_passwordRenewValidTimeInMinutes));
		}
		public static async Task<PasswordRenewCode> AddEmailForNewPassword(string email) {
			string code = GetCode();
			string? oldCode = GetCodeForNewPassword(email);
			if(!string.IsNullOrEmpty(oldCode))
				return new PasswordRenewCode();
			await SetCache(email, code);
			return new PasswordRenewCode { Code = code, ValidTimeInMinutes = _passwordRenewValidTimeInMinutes };
		}

		static void ChangeResetPasswordCode(string email) {
			Task.Run(async () => {
				string code = GetCode();
				await SetCache(email, code, MyCacheDB.GetExpireTime(email + _minus + _client));
			});
		}
	}
}
