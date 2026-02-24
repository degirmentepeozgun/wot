using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class PackageBook : EntityBase<Guid?> {
		public Guid PackageId {
			get; set;
		}
		public Guid BookId {
			get; set;
		}
	}
}
