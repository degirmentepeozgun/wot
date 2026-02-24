using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Favorite : DeletableEntity<string?> {
		[UniqueColumn(Key = "a")]
        public string? BookId { get; set; }
		[UniqueColumn(Key = "a")]
		public string? CustomerId {
			get; set;
		}
    }
}
