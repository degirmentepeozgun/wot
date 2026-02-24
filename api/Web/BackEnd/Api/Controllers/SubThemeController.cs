using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class SubThemeController : MyReadOnlyController<SubTheme, int> {
		public SubThemeController(SubThemeManager manager,
			ILogger<SubThemeController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "MEB Alt Teması";
		}

		protected async override Task<HttpResult<List<SubTheme>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.ExcludeHiddenRecords();
			return await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
		}
	}
}