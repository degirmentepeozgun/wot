using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Dto;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
    [Route("{language}/[controller]")]
    public class ClientBookController : MyReadOnlyController<ClientBook, string?> {
		readonly ClientManager ClientManager;
        public ClientBookController(ClientBookManager manager,
			ClientManager clientManager,
            ILogger<ClientBookController> logger)
          : base(manager, logger) {
			ClientManager = clientManager;
        }

        protected override string MessagePrefix {
            get => "öğrenci kitabı";
        }

		protected async override Task<HttpResult<List<ClientBook>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
            filters = new List<FilterCondition>();
			var clientId = GetCurrentUser();
			var client = await ClientManager.Get(clientId);
			if(((client?.Flags ?? 0) & 32) > 0) {
				var demoResult = new HttpResult<List<ClientBook>>();
				demoResult.StatusCode = 200;
				demoResult.Data = await (Manager as ClientBookManager).GetDemoBooks(client);
				demoResult.TotalRecords = demoResult.Data.Count;
				demoResult.TotalPages = (int?)Math.Ceiling(demoResult.Data.Count / (double)pageSize);
				if((demoResult.Data?.Any() ?? false) && pageSize > 0 && page > 0)
					demoResult.Data = demoResult.Data.OrderByDescending(x => x.LastUpdateTime).Skip((page - 1) * pageSize).Take(pageSize).ToList();
				return demoResult;
			}
			else {
				filters.Add(new FilterCondition {
					ColumnName = "ClientId",
					Value = clientId
				});
				filters.Add(new FilterCondition {
					ColumnName = "Flags",
					Value = "64",
					Operator = "&"
				});
			}
            var result = await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
			result.Data = await (Manager as ClientBookManager).GetClientBooks(result.Data);
			return result;
		}
		[HttpPost("EditProgress")]
		public virtual async Task<JsonResult> Edit([FromQuery] string bookid, [FromQuery] short progress) {
			HttpResult<ClientBook> result;
			try {
				string userid = GetCurrentUser();
				result = new HttpResult<ClientBook> {
					Data = await (Manager as ClientBookManager).EditProgress(bookid, userid, progress, GetCurrentGroup(), IsDemoAccount()),
					StatusCode = 200,
					TotalRecords = 1
				};
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result = new HttpResult<ClientBook> {
					StatusCode = 700,
					Message = mex.Message
				};
			}
			catch(UnauthorizedAccessException uex) {
				result = new HttpResult<ClientBook> {
					StatusCode = 401
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result = new HttpResult<ClientBook> {
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
				var book = await (Manager as ClientBookManager).GetBook(id, this.GetUserId(), 
					this.GetGroupId(),
					this.GetCurrentEducationGroup(), 
					this.GetUserAccountExpire(),
					this.IsDemoAccount());
				if(book != null) {
					result.StatusCode = 200;
					result.Data = new BookDto {
						ReadStartDateTime = DateTime.Now,
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

		[HttpGet("Events")]
		public async Task<HttpResult<List<ClientEvent>>?> GetAllEvents() {
			HttpResult<List<ClientEvent>>? result = new();
			try {
				var data = await ClientManager.GetAllEvents(this.GetUserId());
				result.StatusCode = 200;
				result.Data = data;
				result.TotalRecords = data?.Count ?? 0;
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