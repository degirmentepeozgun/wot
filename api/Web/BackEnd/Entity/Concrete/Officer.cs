using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Officer : EntityBase<string?> {
        public string? Name { get; set; }
    }
}
