using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class ProductPrice : EntityBase<string> {
        public int MonthCount { get; set; }
        public decimal Amount { get; set; }
        public decimal DiscountedAmount { get; set; }
        public decimal Discount { get; set; }
        public string ProductId { get; set; }
        public string Currency { get; set; }
        public string Name { get; set; }
    }
}
