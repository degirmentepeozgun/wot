using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class PackageCode : EntityBase<string?> {
		public string? CompanyId {
			get; set;
		}
		public Guid? PackageId {
			get; set;
		}
        public string? ClientId { get; set; }

        public Package? Package { get; set; }
    }
}
