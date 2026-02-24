using Core.BusinessTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class WithdrawDetailManager : BusinessBase<WithdrawDetail, string> {
		public WithdrawDetailManager() {
			DatabaseName = "Sales";
			Schema = "public";
		}
	}
}
