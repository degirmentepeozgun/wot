using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class BasketItem : DeletableEntity<Guid?> {
		
		[UniqueColumn]
		public string? BookId { get; set;
		}
		[UniqueColumn]
		public Guid BasketId { get; set; }
    }
}
