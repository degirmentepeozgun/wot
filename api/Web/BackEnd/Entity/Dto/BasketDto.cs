using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Entity.Dto {
	public class Sub {
		public Guid Id {
			get; set;
		}
		public decimal TotalPrice {
			get; set;
		}
		public decimal TotalDiscount {
			get; set;
		}
		public decimal TotalDiscountedPrice {
			get; set;
		}
		public List<Book> Items {
			get; set;
		}
	}
}
