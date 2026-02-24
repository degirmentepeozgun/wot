using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Core.RedisCache;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Business.Manager {
	public class CustomerManager : BusinessBase<Customer, string?> {
		public static int _passwordRenewValidTimeInMinutes = 3;
		const string _minus = "-", _customer = "customer";

		public async Task<Customer?> ActivateAccount(Customer obj) {
			await CheckUpdateEmail(obj.Email, (obj.IsUpdating ?? false) ? obj.Id : null);
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "Phone",
				Value = obj.Phone
			});
			var existingUser = (await base.Filter(filters, 1, 1))?.Data?.FirstOrDefault();
			if(existingUser != null)
				throw new MyException("Bu telefon kullanılıyor");
			filters.Clear();
			if(!(obj.IsUpdating ?? false)) {
				obj.Id = "S-" + Guid.NewGuid();
				obj.UserName = obj.Email;
				obj.LastUpdateTime = null;
			}
			//return (await this.Edit(obj))?.Updated ?? false;
			return await this.Edit(obj);
		}

		public static async Task<bool> CheckUpdateEmail(string email, string? userid = null) {
			Database db = new();
			db.AddParameter(email);
			if(!string.IsNullOrEmpty(userid))
				db.AddParameter(userid);
			var emailCheck = await db.Execute<EmailCheckDto>("web", "checkemail", true);
			if(emailCheck?.HasEmail ?? false)
				throw new MyException("Bu e-posta kullanılıyor");
			return true;
		}
		public async Task<Customer?> TryActivateAccount(Customer obj) {
			await CheckUpdateEmail(obj.Email);
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "Phone",
				Value = obj.Phone
			});
			var existingUser = (await base.Filter(filters, 1, 1))?.Data?.FirstOrDefault();
			if(existingUser != null)
				throw new MyException("Bu telefon kullanılıyor");
			filters.Clear();
			//obj.Id = "S-" + Guid.NewGuid();
			//obj.UserName = obj.Email;
			return obj;
		}
		public static async Task<Client> CheckEmail(string userName, string email) {
			Database db = new();
			db.AddParameter(userName);
			db.AddParameter(email);
			var result = await db.Execute<Client>("login", _customer + "emailcheck");
			if(result == null)
				return new Client { Flags = 128 };
			return result;
		}
		public static async Task<Client> CheckOnlyEmail(string email) {
			Database db = new();
			db.AddParameter(email);
			var result = await db.Execute<Client>("login", _customer + "emailexistcheck");
			if(result == null)
				return new Client { Flags = 128 };
			return result;
		}


		public static async Task<bool> EditUserPassword(string email, string newPassword) {
			Database db = new();
			db.AddParameter(_customer);
			db.AddParameter(email);
			db.AddParameter(newPassword);
			bool success = ((await db.Execute<DBReturnObject<int>>("login", "updatepassword", true))?.Data ?? 0) > 0;
			if(success)
				ChangeResetPasswordCode(email);
			return success;
		}
		public static string? GetCodeForNewPassword(string email) {
			return MyCacheDB.GetCache(email + _minus + _customer);
		}
		static string GetCode() {
			return Guid.NewGuid().ToString().Replace(_minus, string.Empty)[..12].ToUpper();
		}
		static async Task SetCache(string email, string code, TimeSpan? ts = null) {
			await MyCacheDB.SetCache(email + _minus + _customer, code, ts ?? TimeSpan.FromMinutes(_passwordRenewValidTimeInMinutes));
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
				await SetCache(email, code, MyCacheDB.GetExpireTime(email + _minus + _customer));
			});
		}

		public static bool SendSms(string phone, string text) {
			try {
				if(phone.Length <= 10)
					phone = "90" + phone;
				else if(phone.Length < 12)
					phone = "9" + phone;
				Sms[] sms = new Sms[1] { new Sms(phone, text) };
				SmsRequest request = new();
				request.Messages = sms;
				request.UserName = "908502418429";
				request.Password = "u94059*0*???**-";
				request.Source_Addr = "Kitap12";
				request.Valid_For = "00:03";
				string payload = JsonSerializer.Serialize(request, new JsonSerializerOptions { PropertyNamingPolicy = new LowerCaseNamingPolicy() });
				HttpClient client = new();
				client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
				HttpRequestMessage req = new(HttpMethod.Post, "https://sms.verimor.com.tr/v2/send.json");
				req.Content = new StringContent(payload, Encoding.UTF8, "application/json");
				client.SendAsync(req).ContinueWith(responseTask => {
					if(responseTask.Result.StatusCode != HttpStatusCode.OK)
						throw new Exception(responseTask.Result.ToString());
				});
				return true;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
			}
			return false;
		}
	}
	internal class LowerCaseNamingPolicy : JsonNamingPolicy {
		public override string ConvertName(string name) {
			if(string.IsNullOrEmpty(name))
				return name;
			return name.ToLower();
		}
	}
	public class Sms {
		readonly string _dest, _msg;
		public Sms(string phoneNumber, string message) {
			_dest = phoneNumber;
			_msg = message;
		}
		public string Dest => _dest;

		public string Msg => _msg;
	}

	class SmsRequest {
		public string UserName {
			get; set;
		}
		public string Password {
			get; set;
		}
		public string Source_Addr {
			get; set;
		}
        public string Valid_For { 
			get; set; 
		}
        public Sms[] Messages {
			get; set;
		}
	}
}
