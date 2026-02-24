using Core.BusinessTemplates.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class FeedManager : BusinessBase<Web.BackEnd.Entity.Wot.Feedback, string?> {
		public FeedManager() {
			DatabaseName = "Wot";
			Schema = "public";
		}
	}
}
