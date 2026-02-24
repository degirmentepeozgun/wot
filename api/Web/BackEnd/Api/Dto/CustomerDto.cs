using System.ComponentModel.DataAnnotations;

namespace Api.Dto {
	public class CustomerDto {
		[Required]
		public string Email {
			get; set;
		}
		[Required]
		public string Phone {
			get; set;
		}
		[Required]
		public string Name {
			get; set;
		}
		public string? SurName {
			get; set;
		}
	}
}
