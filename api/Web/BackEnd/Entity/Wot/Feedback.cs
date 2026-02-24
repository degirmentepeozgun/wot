using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Wot {
	public class Feedback : EntityBase<string?> {
        public int? Rate { get; set; }
        public string? Message { get; set; }
    }
}
