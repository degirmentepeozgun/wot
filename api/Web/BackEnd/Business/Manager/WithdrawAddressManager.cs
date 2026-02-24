using Core.BusinessTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class WithdrawAddressManager : BusinessBase<WithdrawAddress, string?> {
		public WithdrawAddressManager() {
			DatabaseName = "Sales";
			Schema = "public";
		}
	}
}
