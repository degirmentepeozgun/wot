using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Company : EntityBase<string?> {
		[Sortable]
		public string Name {
			get; set;
		}

		public string City {
			get; set;
		}
	}
}
