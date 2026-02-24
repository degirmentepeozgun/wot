using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class ThemeController : MyReadOnlyController<Theme, int> {
		public ThemeController(ThemeManager manager,
			ILogger<ThemeController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "MEB Teması";
		}

		protected async override Task<HttpResult<List<Theme>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.ExcludeHiddenRecords();
			return await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
		}
	}
}