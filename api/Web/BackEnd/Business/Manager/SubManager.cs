using Core.BusinessTemplates.Concrete;
using Web.BackEnd.Entity.Wot;

namespace Web.BackEnd.Business.Manager {
	public class SubManager : BusinessBase<Sub, string> {
		public SubManager() {
			DatabaseName = "Wot";
			Schema = "public";
		}
	}
}
