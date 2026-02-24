using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class SubTheme : EntityBase<int> {
		[Sortable]
		public string Name { get; set; }
    }
}
