using System.ComponentModel.DataAnnotations;

namespace Web.BackEnd.Entity.Dto {

	public class PaymentDtoBase {
		[Required]
		public decimal Amount {
			get; set;
		}
		[Required]
		[RegularExpression(@"^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$", ErrorMessage = "Kart numarası doğru formatta değil")]
		public string CardNumber {
			get; set;
		}
		[Required]
		public string CardHolderName {
			get; set;
		}
		[Required]
		[RegularExpression(@"^\d{2}\/?\d{2}$", ErrorMessage = "Kart son kullanım tarihi doğru formatta değil")]
		public string CardExpire {
			get; set;
		}
		[Required]
		[RegularExpression(@"^\d{3}$", ErrorMessage = "Kart güvenlik numarası doğru formatta değil")]

		public string CardCVV2 {
			get; set;
		}
	}

	public class PaymentDto : PaymentDtoBase {
		[Required]
        public string ProductIds { get; set;
		}
		[Required]
		public string BillAddressId { get; set;
		}
	}
	public class PaymentDtoTEST : PaymentDtoBase {
		public string? Email {
			get; set;
		}
	}
}
