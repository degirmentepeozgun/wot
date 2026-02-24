using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class PortalPackageBook: EntityBase<string> {
		public string PortalPackageId {
			get; set;
		}
        public string BookId { get; set; }
        public string? Name { get; set; }
        public bool? IsEpub { get; set;
		}
		public decimal? PrintedPrice {
			get; set;
		}
	}
}
