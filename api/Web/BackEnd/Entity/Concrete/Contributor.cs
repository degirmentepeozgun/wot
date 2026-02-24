using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Contributor : EntityBase<int> {
		[Sortable]
		public string Name { get; set; }
        public string Type { get; set; }
        public short? Rank { get; set; }
    }
}
