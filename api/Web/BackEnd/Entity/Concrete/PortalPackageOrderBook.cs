using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class PortalPackageOrderBook : EntityBase<Guid?> {
		public string? PortalPackageId {
			get; set;
		}
		public string CustomerId {
			get; set;
		}
		public Guid OrderId {
			get; set;
		}
		public string BookId {
			get; set;
		}
        public string Name { get; set; }
		public DateTime? Expire {
			get;
			set;
		}
	}
}
