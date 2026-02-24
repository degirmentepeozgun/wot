using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Basket : EntityBase<Guid?> {
        public string CustomerId { get; set;
		}
        public bool? Modified { get; set; }
    }
}
