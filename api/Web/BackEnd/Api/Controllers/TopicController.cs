using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class TopicController : MyReadOnlyController<Topic, int> {
		public TopicController(TopicManager manager,
			ILogger<TopicController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "MEB Teması";
		}

		protected async override Task<HttpResult<List<Topic>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.ExcludeHiddenRecords();
			return await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
		}
	}
}