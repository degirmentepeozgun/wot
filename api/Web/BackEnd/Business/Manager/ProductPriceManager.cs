using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class ProductPriceManager : BusinessBase<ProductPrice, string> {
		public ProductPriceManager() {
			DatabaseName = "Sales";
			Schema = "public";
		}

		public override Task<ProductPrice?> Edit(ProductPrice obj, Token? token = null, Database? dBWithTran = null, bool doNotCommit = false, List<FilterCondition>? filters = null, string? tranid = null) {
			throw new UnauthorizedAccessException();
		}
	}
}
