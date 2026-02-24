using System.ComponentModel.DataAnnotations;

namespace Api.Dto {
	public class PasswordResetDto : PasswordResetCodeDto {
		public string Code {
			get; set;
		}
		[RegularExpression(@"^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$", ErrorMessage = "Parola : {0}, minimum 6 karakter uzunluğunda olmalı, Türkçe karakter içermemeli ve en az 1 rakam içermelidir")]
		public string Password {
			get; set;
		}
	}
}
