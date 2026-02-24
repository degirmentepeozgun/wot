using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class GameController : MyReadOnlyController<Game, int> {
		readonly MultiLangDataManager MultiLangDataManager;
		public GameController(GameManager manager, MultiLangDataManager multiLangManager,
			ILogger<GameController> logger)
		  : base(manager, logger) {
			MultiLangDataManager = multiLangManager;
		}

		protected override string MessagePrefix {
			get => "oyun";
		}

		protected async override Task<HttpResult<List<Game>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.ExcludeHiddenRecords();
			var result = await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
			if(!string.IsNullOrEmpty(language) && (result.Data?.Any() ?? false)) {
				var ids = result.Data.Select(x => x.Id.ToString());
				var langData = await MultiLangDataManager.GetData(ids, "game", language, "name");
				if(langData?.Any() ?? false)
					result.Data.ForEach(x => x.Name = langData.FirstOrDefault(y => y.ItemId == x.Id.ToString())?.Value ?? x.Name);
			}
			return result;
		}
	}
}