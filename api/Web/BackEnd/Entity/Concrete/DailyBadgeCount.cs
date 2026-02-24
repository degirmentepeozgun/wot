using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class DailyBadgeCount : EntityBase<Guid?> {
		public string? ClientId {
			get; set;
		}
		public int BadgeCount {
			get; set;
		}
		public int LoginBadgeCount {
			get; set;
		}

		public DateTime? LastQuestCompleteDateTime {
			get; set;
		}
		public DateTime? LastLoginCompleteDateTime {
			get; set;
		}
	}
}
