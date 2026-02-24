using Core.BusinessTemplates.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class MissionSessionManager : BusinessBase<Web.BackEnd.Entity.Wot.MissionSession, string?> {
		public MissionSessionManager() {
			DatabaseName = "Wot";
			Schema = "public";
		}
	}
}
