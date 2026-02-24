using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Api.Attribute;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class FeedbackController : MyControllerBase<Feedback, Guid?> {
		public FeedbackController(FeedbackManager manager,
			ILogger<FeedbackController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "geribildirim";
		}

		protected override Task<HttpResult<List<Feedback>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			throw new MyException("Bu özellik kullanılamaz");
		}

		public async override Task<JsonResult> Edit([FromBody] Feedback obj) {
			obj.Id = Guid.NewGuid();
			obj.ClientId = GetCurrentUser();
			return await base.Edit(obj);
		}
	}
}