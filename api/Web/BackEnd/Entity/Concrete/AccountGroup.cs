using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class AccountGroup : EntityBase<Guid?> {
		
		public string Name {
			get; set;
		}

		public string Level {
			get; set;
		}
		public string? CompanyId {
			get; set;
		}
        public string? OfficerId { get; set; }
    }
}
