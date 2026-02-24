using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Dto;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
    [Route("{language}/[controller]")]
    public class CustomerBookController : MyReadOnlyController<CustomerBook, string?> {
        public CustomerBookController(CustomerBookManager manager,
            ILogger<CustomerBookController> logger)
          : base(manager, logger) {
        }

        protected override string MessagePrefix {
            get => "öğrenci kitabı";
        }

		protected async override Task<HttpResult<List<CustomerBook>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
            filters = new List<FilterCondition>();
            filters.Add(new FilterCondition {
                ColumnName = "CustomerId",
                Value = GetCurrentUser()
            });
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Value = "64",
				Operator = "&"
			});
			filters.ExcludeHiddenRecords();
			var result = await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
			result.Data = await (Manager as CustomerBookManager).GetCustomerBooks(result.Data);
			return result;
		}

		[HttpPost("EditProgress")]
		public virtual async Task<JsonResult> Edit([FromQuery] string bookid, [FromQuery] short progress) {
			HttpResult<CustomerBook> result;
			try {
				string userid = GetCurrentUser();
				result = new HttpResult<CustomerBook> {
					Data = await (Manager as CustomerBookManager).EditProgress(bookid, userid, progress),
					StatusCode = 200,
					TotalRecords = 1
				};
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result = new HttpResult<CustomerBook> {
					StatusCode = 700,
					Message = mex.Message
				};
			}
			catch(UnauthorizedAccessException uex) {
				result = new HttpResult<CustomerBook> {
					StatusCode = 401
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result = new HttpResult<CustomerBook> {
					Message = ex.Message,
					StatusCode = 700
				};
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpGet("GetSingleBook")]
		public async Task<HttpResult<BookDto>?> GetSingleBook(string? language, string id) {
			HttpResult<BookDto> result = new();
			try {
				var book = await (Manager as CustomerBookManager).GetBook(id, this.GetUserId(), this.GetCurrentEducationGroup());
				if(book != null) {
					result.StatusCode = 200;
					result.Data = new BookDto {
						Language = book.Language ?? "tr",
						BookId = book.Id,
						Id = id,
						Flags = book.Flags.Value,
						IsEpub = !book.IsEpub.HasValue || (book.IsEpub.HasValue && book.IsEpub.Value)
					};
					result.TotalRecords = 1;
				}
				else
					throw new MyException("Kitap Bulunamadı");
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}
	}
}