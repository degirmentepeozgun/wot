using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.BusinessTemplates.Statics;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class ClientBookManager : BusinessBase<ClientBook, string?> {
		readonly BookManager BookManager;
		readonly PublisherReadsByMonthManager PublisherReadsByMonthManager;
		readonly TotalPublisherReadsByMonthManager TotalPublisherReadsByMonthManager;
		public ClientBookManager(BookManager bookManager,
			PublisherReadsByMonthManager publisherReadsByMonthManager,
			TotalPublisherReadsByMonthManager totalPublisherReadsByMonthManager) {
			BookManager = bookManager;
			PublisherReadsByMonthManager = publisherReadsByMonthManager;
			TotalPublisherReadsByMonthManager = totalPublisherReadsByMonthManager;
		}
		public async Task<ClientBook?> EditProgress(string bookid, string clientid, short progress, string companyId, bool demo) {
			if(progress > 100)
				progress = 100;
			if(progress < 0)
				throw new MyException("Geçersiz İstatistik");
			DateTime now = DateTime.Now;
			DateTime currentMonth = new(now.Year, now.Month, 1, 0, 0, 0);
			List<FilterCondition> conditions = new();
			conditions.Add(new FilterCondition { ColumnName = "ClientId", Value = clientid });
			conditions.Add(new FilterCondition { ColumnName = "BookId", Value = bookid });
			var book = (await Filter(conditions, 1, 1))?.Data?.FirstOrDefault();
			if(book == null)
				throw new MyException("Kitap bulunamadı") { Log = true };
			int oldProgress = book.Progress;
			var publisherBook = await BookManager.Get(book.BookId, true);
			if(publisherBook == null)
				throw new MyException("Yayıncı Kitabı bulunamadı");
			var publisherId = publisherBook?.PublisherId;
			if(publisherId == null)
				throw new MyException("Yayıncı bulunamadı");
			var stats = (await PublisherReadsByMonthManager.Filter(new List<FilterCondition> { new FilterCondition {
					ColumnName = "CompanyId",
					Value = companyId
				},
				new FilterCondition {
					ColumnName = "Isbn",
					Value = publisherBook.Isbn
				}, new FilterCondition{
					ColumnName = "CreateDateTime",
					Value = currentMonth.ToString(Variables.DatePattern)
				} }, 1, 1))?.Data?.FirstOrDefault();
			var totalStats = (await TotalPublisherReadsByMonthManager.Filter(new List<FilterCondition> { new FilterCondition {
					ColumnName = "PublisherId",
					Value = publisherId
				},
				new FilterCondition {
					ColumnName = "CompanyId",
					Value = companyId
				}, new FilterCondition{
					ColumnName = "CreateDateTime",
					Value = currentMonth.ToString(Variables.DatePattern)
				} }, 1, 1))?.Data?.FirstOrDefault();
			Database? db = null;
			try {
				db = new(true);
				db.AddParameter(clientid);
				db.AddParameter(bookid);
				db.AddParameter(progress);
				var result = await db.Execute<ClientBook>("web", "bookprogressedit", true);
				if(result == null)
					throw new MyException("Kitap bulunamadı");
				if(demo)
					goto end;
				int diff = result.Progress - oldProgress;
				if(diff > 0) {
					if(stats == null)
						stats = new PublisherReadsByMonth {
							Isbn = publisherBook.Isbn,
							CreateDateTime = currentMonth,
							CompanyId = companyId,
							PublisherId = publisherId,
							ProfileId = publisherId + "01",
							TotalProgress = diff,
							Id = Guid.NewGuid()
						};
					else
						stats.TotalProgress += diff;
					stats = await PublisherReadsByMonthManager.Edit(stats, dBWithTran: db, doNotCommit: true);
					if(stats == null)
						throw new MyException(publisherId + " kodlu yayıncıya ait " + book.BookId + " numaralı kitap için aylık istatistik alınamadı");
					if(totalStats != null)
						totalStats.TotalProgress += diff;
					else
						totalStats = new TotalPublisherReadsByMonth {
							CreateDateTime = currentMonth,
							PublisherId = publisherId,
							CompanyId = companyId,
							ProfileId = publisherId + "01",
							TotalProgress = diff,
							Id = Guid.NewGuid()
						};
					totalStats = await TotalPublisherReadsByMonthManager.Edit(totalStats, dBWithTran: db);
					if(totalStats == null)
						throw new MyException(publisherId + " kodlu yayıncıya ait aylık toplam istatistik alınamadı");
				}
				end:
				if(db != null)
					await db.EndTransaction();
				return result;
			}
			catch(MyException mex) {
				if(db != null)
					await db.EndTransaction(false);
				mex.Log = true;
				throw mex;
			}
			catch {
				if(db != null)
					await db.EndTransaction(false);
				throw;
			}
		}

		public async Task<List<ClientBook>?> GetDemoBooks(Client client) {
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Operator = "&",
				GroupId = "x",
				GroupAnd = true,
				Value = "32"
			});
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Operator = "!&",
				GroupId = "y",
				GroupAnd = true,
				Value = "128"
			});
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Value = "256",
				GroupId = "z",
				GroupAnd = true,
				Operator = "!&"
			});
			var books = (await BookManager.Filter(filters))?.Data;
			filters.Clear();
			filters.Add(new FilterCondition {
				ColumnName = "ClientId",
				Value = client.Id
			});
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Value = "64",
				GroupId = "x",
				GroupAnd = true,
				Operator = "&"
			});
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Value = "128",
				GroupId = "y",
				GroupAnd = true,
				Operator = "!&"
			});
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Value = "256",
				GroupId = "z",
				GroupAnd = true,
				Operator = "!&"
			});
			var clientBooks = (await base.Filter(filters))?.Data;
			var expire = DateTime.Now.AddYears(1);
			return books?.Select(x => {
				var clientBook = clientBooks?.FirstOrDefault(y => y.BookId == x.Id);
				if(clientBook != null && clientBook.Flags.HasValue && (clientBook.Flags & 32) == 0)
					clientBook.Flags += 32;
				if(clientBook != null)
					return clientBook;
				return new ClientBook {
					Id = x.Id,
					BookId = x.Id,
					ClientId = client.Id,
					Flags = 96,
					Expire = client.ExpireDateTime,
					IsEpub = x.IsEpub,
					Name = x.Name,
					PageCount = x.PageCount,
					Progress = 0
				};
			}
			)?.ToList();
		}

		public async Task<List<ClientBook>?> GetClientBooks(List<ClientBook> clientBooks) {
			List<FilterCondition> filters = new();
			filters.AddRange(clientBooks.Select(x => new FilterCondition {
				ColumnName = _primaryKeyColumnName,
				Value = x.BookId
			}));
			var books = (await BookManager.Filter(filters))?.Data;
			clientBooks.ForEach(x => {
				var _book = books?.FirstOrDefault(y => y.Id == x.BookId);
				x.IsEpub = (_book?.IsEpub ?? false);
				x.PageCount = _book?.PageCount ?? 0;
			});
			return clientBooks;
		}

		public async Task<Book?> GetBook(string clientBookId, string userId, string companyId,
			short? educationGroup, DateTime? expire, bool isDemoAcc) {
			try {
				var clientbook = await Get(clientBookId);
				if(clientbook != null)
					return await BookManager.Get(clientbook.BookId, true);
			}
			catch(MyException mex) {
				if(mex.StatusCode == 404) {
					var book = await BookManager.Get(clientBookId.ToString());
					if(book == null)
						throw new MyException(Name + " Not Found") { StatusCode = 404 };
					var clientbook = (await this.Filter(new List<FilterCondition>() {
						new FilterCondition() {
							ColumnName = "BookId",
							Value = book.Id
						},
						new FilterCondition() {
							ColumnName = "ClientId",
							Value = userId
						}
					}, 1, 1))?.Data?.FirstOrDefault();
					if(clientbook != null)
						return await BookManager.Get(clientbook.BookId, true);
					//else if(book.EducationGroup != educationGroup.Value && !isDemoAcc)
					//	throw new MyException("Bu kitap eğitim grubunuza göre değil");
					if(isDemoAcc && book != null && book.Flags != null && (book.Flags & 32) == 0)
						throw new MyException("Bu kitap tanıtım hesapları için aktif değil");
					await this.Edit(new ClientBook {
						ClientId = userId,
						CompanyId = companyId,
						CompanyBookId = book.Id,
						BookId = book.Id,
						Name = book.Name,
						Progress = 0,
						IsEpub = book.IsEpub,
						Expire = expire.Value,
						OfficerId = "System",
						Id = Guid.NewGuid().ToString()
					});
					return book;
				}
			}
			return null;
		}
	}
}
