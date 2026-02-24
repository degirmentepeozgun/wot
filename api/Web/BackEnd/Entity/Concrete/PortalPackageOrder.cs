using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class PortalPackageOrder : EntityBase<Guid?> {
		public string? PortalPackageId {
			get; set;
		}
		public string? CustomerId {
			get; set;
		}
		public DateTime? ExpireDateTime {
			get; set;
		}
		public string? Code {
			get; set;
		}
		public decimal? Price {
			get; set;
		}
		public string? OwnerId {
			get; set;
		}
		public string Name {
			get; set;
		}
	}
}
