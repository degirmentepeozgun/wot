using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class ProductManager : BusinessBase<Product, string> {
		readonly ProductPriceManager ProductPriceManager;
		public ProductManager(ProductPriceManager productPriceManager) {
			DatabaseName = "Sales";
			Schema = "public";
			ProductPriceManager = productPriceManager;
		}
		public override async Task<DBReturnObject<List<Product>>?> Filter(IEnumerable<FilterCondition> filters, int page = 1, int pageSize = 1000000, string? sort = null, Database? tran = null) {
			var result = await base.Filter(filters, page, pageSize, sort, tran);
			if(result?.Data != null) {
				var f = new List<FilterCondition>();
				f.ExcludeHiddenRecords();
				var prices = await ProductPriceManager.Filter(f, 1, default);
				if(prices?.Data?.Any() ?? false)
					foreach(var product in result.Data)
						product.Prices = prices.Data.Where(x => x.ProductId == product.Id)?.OrderBy(x => x.MonthCount)?.ToList();
				result.Data = result.Data.Where(x => x.Prices != null)?.ToList();
				result.TotalCount = result.Data?.Count?? 0;
			}
			return result;
		}

		public override async Task<Product?> Get(string id, bool includeHiddenRecords = false, Database? tran = null) {
			var product = await base.Get(id, includeHiddenRecords, tran);
			if(product != null) {
				var f = new List<FilterCondition>();
				f.ExcludeHiddenRecords();
				f.Add(new FilterCondition {
					ColumnName = "ProductId",
					Value = id
				});
				product.Prices = (await ProductPriceManager.Filter(f, 1, default))?.Data;
			}
			return product;
		}
	}
}
