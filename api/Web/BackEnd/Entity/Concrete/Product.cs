using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Product : EntityBase<string> {
		public string Name {
			get; set;
		}
		public decimal Amount {
			get; set;
		}
		public string Currency {
			get; set;
		}
		public string? Description {
			get; set;
		}
		public string Source {
			get; set;
		}
		public string ProductId {
			get; set;
		}
		public string? GroupName {
			get; set;
		}
		public short? Rank {
			get; set;
		}
        public List<ProductPrice>? Prices { get; set; }
    }
}
