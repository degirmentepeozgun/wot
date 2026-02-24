using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Country : EntityBase<string> {
        public string Name { get; set; }
    }
}
