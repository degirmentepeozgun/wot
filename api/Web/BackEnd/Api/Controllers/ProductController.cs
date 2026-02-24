using Core.BusinessTemplates.Entity;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class ProductController : MyReadOnlyController<Product, string> {
		const string _filterName = "Source", _filterValue = "kitap12";
		public ProductController(ProductManager manager,
			ILogger<ProductController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "ürün";
		}

		protected override Task<HttpResult<List<Product>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			filters.AddOnly(new FilterCondition {
				ColumnName = _filterName,
				Value = _filterValue
			});
			filters.ExcludeHiddenRecords();
			return base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
		}
	}
}