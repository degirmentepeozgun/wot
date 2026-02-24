using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Withdraw : EntityBase<string?> {
		public string CustomerId {
			get; set;
		}
		public DateTime? ExpireDateTime {
			get; set;
		}
		public decimal TotalAmount {
			get; set;
		}
		public decimal DiscountAmount {
			get; set;
		}

		public string? CouponCode {
			get; set;
		}
		public decimal CouponDiscountAmount {
			get; set;
		}
		public short BankNo {
			get; set;
		}
		public string CreditCardBin {
			get; set;
		}
		public short Installment {
			get; set;
		}
		public decimal CarryingCharge {
			get; set;
		}
		public string Source {
			get; set;
		}
		public string Phone {
			get; set;
		}
		public string Email {
			get; set;
		}
		public string? TransactionId {
			get; set;
		}
		public string? UtmSource {
			get; set;
		}
		public string? ExceptionMessage {
			get; set;
		}
		public decimal FinalAmount {
			get; set;
		}
		public decimal TotalDiscount {
			get;
			set;
		}
        public string? Language { get; set; }
        public bool IsActive {
			get {
				return (this.Flags & 2) > 0 && this.ExpireDateTime > DateTime.Now;
			}
		}
	}
}
