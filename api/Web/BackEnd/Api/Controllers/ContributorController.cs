using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Microsoft.AspNetCore.Mvc;
using Core.Logging;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class ContributorController : MyReadOnlyController<Contributor, int> {
		readonly BookManager BookManager;
		public ContributorController(ContributorManager manager,
			BookManager bookManager,
			ILogger<ContributorController> logger)
		  : base(manager, logger) {
			BookManager = bookManager;
		}

		protected override string MessagePrefix {
			get => "MEB Teması";
		}

		protected async override Task<HttpResult<List<Contributor>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.ExcludeHiddenRecords();
			return await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
		}

		[HttpGet("GetByBookId")]
		public async Task<JsonResult> Get(string bookId) {
			HttpResult<List<Contributor>?> result = new();
			try {
				var book = await BookManager.Get(bookId);
				if(string.IsNullOrEmpty(bookId?.ToString()))
					throw new MyException("Geçersiz Kitap ID");
				var item = await (Manager as ContributorManager).GetContributorsByAuthorIds(book.AuthorIds);
				result.StatusCode = 200;
				result.Data = item;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}
		[HttpGet("GetAuthors")]
		public async Task<JsonResult> GetAuthors(string id) {
			HttpResult<List<Contributor>?> result = new();
			try {
				var ids = id.Split(new char[3] { ',', '_', ' ' }, StringSplitOptions.RemoveEmptyEntries);
				List<int>? AuthorIds = null;
				if(ids?.Any() ?? false)
					try {
						AuthorIds = ids.Select(x => Convert.ToInt32(x)).ToList();
					}
					catch {
						throw new MyException("Geçersiz Yazar Bilgisi");
					}
				if((AuthorIds?.Count ?? 0) == 0)
					throw new MyException("Geçersiz Yazar Bilgisi");
				var item = await (Manager as ContributorManager).GetContributorsByAuthorIds(AuthorIds);
				result.StatusCode = 200;
				result.Data = item;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}
	}
}