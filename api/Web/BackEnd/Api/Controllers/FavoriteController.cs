using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class FavoriteController : MyDeletableControllerBase<Favorite, string?> {
		public FavoriteController(FavoriteManager manager,
			ILogger<FavoriteController> logger)
		  : base(manager, logger) {
		}

		protected async override Task<HttpResult<List<Favorite>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters = new List<FilterCondition>();
			filters.Add(new FilterCondition {
				ColumnName = "CustomerId",
				Value = GetCurrentUser()
			});
			return await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
		}

		protected override string MessagePrefix {
			get => "favori";
		}

		public async override Task<JsonResult> Edit([FromBody] Favorite obj) {
			obj.CustomerId = this.GetCurrentUser();
			return await base.Edit(obj);
		}
	}
}