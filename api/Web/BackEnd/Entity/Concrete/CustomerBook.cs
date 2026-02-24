using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class CustomerBook : EntityBase<string?> {
        [UniqueColumn]
        public string CustomerId { get; set;
		}
		[UniqueColumn]
		public string BookId { get; set; }
        public string? PortalPackageId { get; set;
		}
		public DateTime Expire { get; set; }
        public short Progress { get; set; }
        public string? PortalPackageOrderId { get; set; }
        public string Name { get; set; }
        public bool? IsEpub { get; set; }
    }
}
