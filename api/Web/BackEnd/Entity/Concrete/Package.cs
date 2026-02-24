using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Package : EntityBase<Guid?> {
		public DateTime EndDate {
			get; set;
		}

		public DateTime StartDate {
			get; set;
		}
		public string? CompanyId {
			get; set;
		}
		public string Level {
			get; set;
		}
	}
}
