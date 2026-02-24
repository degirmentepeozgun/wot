using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class WithdrawDetail : EntityBase<string> {
		public string WithdrawId {
			get; set;
		}
		public string ProductName {
			get; set;
		}
        public string CustomerId { get; set; }
        public DateTime ExpireDateTime { get; set; }
        public string ProductId { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
		public decimal FinalAmount => this.TotalAmount - this.DiscountAmount;
		public bool IsActive {
			get {
				return this.ExpireDateTime > DateTime.Now;
			}
		}
	}
}
