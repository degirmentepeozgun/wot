using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Publisher : EntityBase<string> {
        [Sortable]
        public string Name { get; set; }
    }
}
