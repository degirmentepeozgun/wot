using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class PublisherController : MyReadOnlyController<Publisher, string> {
		public PublisherController(PublisherManager manager,
			ILogger<PublisherController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "yayınevi";
		}

		protected async override Task<HttpResult<List<Publisher>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.ExcludeHiddenRecords();
			var publishers = await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
			if(publishers != null) {
				publishers.Data ??= new();
				publishers.Data = publishers.Data.Where(x => (x.Flags & 32) == 0)?.ToList();
				publishers.Data ??= new();
				publishers.Data.Add(new Publisher {
					Id = Guid.Empty.ToString(),
					Name = "Kitap12"
				});
			}
			return publishers;
		}
		public override async Task<JsonResult> GetById(string id) {
			id = string.Concat(id[0].ToString().ToUpper(), id.AsSpan(1));
			return await base.GetById(id);
		}
	}
}