using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.BusinessTemplates.Statics;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class CustomerBookManager : BusinessBase<CustomerBook, string?> {
		readonly BookManager BookManager;
		readonly PublisherReadsByMonthManager PublisherReadsByMonthManager;
		readonly TotalPublisherReadsByMonthManager TotalPublisherReadsByMonthManager;
		public CustomerBookManager(BookManager bookManager, 
			PublisherReadsByMonthManager publisherReadsByMonthManager,
			TotalPublisherReadsByMonthManager totalPublisherReadsByMonthManager) {
			BookManager = bookManager;
			PublisherReadsByMonthManager = publisherReadsByMonthManager;
			TotalPublisherReadsByMonthManager = totalPublisherReadsByMonthManager;
		}
		public async Task<List<CustomerBook>?> GetCustomerBooks(List<CustomerBook> customerBooks) {
			if(customerBooks?.Any() ?? false) {
				List<FilterCondition> filters = new();
				filters.AddRange(customerBooks.Select(x => new FilterCondition {
					ColumnName = _primaryKeyColumnName,
					Value = x.BookId
				}));
				var books = (await BookManager.Filter(filters))?.Data;
				customerBooks.ForEach(x => x.IsEpub = (books?.FirstOrDefault(y => y.Id == x.BookId)?.IsEpub ?? false));
			}
			return customerBooks;
		}
		public async Task<Book?> GetBook(string customerBookId, string userId, short? eg) {
			//LogKeeper.LogInfo(customerBookId.ToString() + " " + (eg == null ? "-" : eg.ToString()));
			var customerBook = await GetWithoutError(customerBookId, true);
			if(customerBook == null) {
				List<FilterCondition> filters =new();
				filters.Add(new FilterCondition {
					ColumnName = "BookId",
					Value = customerBookId.ToString()
				});
				filters.Add(new FilterCondition {
					ColumnName = "CustomerId",
					Value = userId
				});
				customerBook = (await base.Filter(filters, 1, 1))?.Data?.FirstOrDefault();
				if(customerBook == null) {
					var book = await BookManager.Get(customerBookId, true);
					if(eg != null && book != null && !book.IsHidden && (book.EducationGroup & eg) > 0)
						return book;
				}
				else
					return await BookManager.GetWithoutError(customerBookId, true);
			}
			else
				return await BookManager.GetWithoutError(customerBook.BookId, true);
			return null;
		}

		public async Task<CustomerBook?> EditProgress(string bookid, string customerid, short progress) {
			if(progress > 100)
				progress = 100;
			if(progress < 0)
				throw new MyException("Geçersiz İstatistik");
			DateTime now = DateTime.Now;
			DateTime currentMonth = new(now.Year, now.Month, 1, 0, 0, 0);
			List<FilterCondition> conditions = new();
			conditions.Add(new FilterCondition { ColumnName = "CustomerId", Value = customerid });
			conditions.Add(new FilterCondition { ColumnName = "BookId", Value = bookid });
			var book = (await Filter(conditions, 1, 1))?.Data?.FirstOrDefault();
			if(book == null)
				throw new MyException(bookid + " adlı kitap " + customerid + " adlı üyede bulunamadı") { Log = true };
			int oldProgress = book.Progress;
			var publisherBook = await BookManager.Get(book.BookId, true);
			if(publisherBook == null)
				throw new MyException("Yayıncı Kitabı bulunamadı");
			var publisherId = publisherBook?.PublisherId;
			if(publisherId == null)
				throw new MyException("Yayıncı bulunamadı");
			var stats = (await PublisherReadsByMonthManager.Filter(new List<FilterCondition> { new FilterCondition {
					ColumnName = "CompanyId",
					Value = Guid.Empty.ToString()
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
					Value = Guid.Empty.ToString()
				}, new FilterCondition{
					ColumnName = "CreateDateTime",
					Value = currentMonth.ToString(Variables.DatePattern)
				} }, 1, 1))?.Data?.FirstOrDefault();
			Database? db = null;
			try {
				db = new(true);
				db.AddParameter(customerid);
				db.AddParameter(bookid);
				db.AddParameter(progress);
				var result = await db.Execute<CustomerBook>("web", "customerbookprogressedit", true);
				if(result == null)
					throw new MyException("Kitap bulunamadı");
				int diff = result.Progress - oldProgress;
				if(diff > 0) {
					if(stats == null)
						stats = new PublisherReadsByMonth {
							Isbn = publisherBook.Isbn,
							CreateDateTime = currentMonth,
							CompanyId = Guid.Empty.ToString(),
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
							CompanyId = Guid.Empty.ToString(),
							ProfileId = publisherId + "01",
							TotalProgress = diff,
							Id = Guid.NewGuid()
						};
					totalStats = await TotalPublisherReadsByMonthManager.Edit(totalStats, dBWithTran: db);
					if(totalStats == null)
						throw new MyException(publisherId + " kodlu yayıncıya ait aylık toplam istatistik alınamadı");
				}
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
	}
}
