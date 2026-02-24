using Core.EntityTemplates.Extension;
using System.ComponentModel.DataAnnotations;

namespace Core.EntityTemplates.Attribute {
	[AttributeUsage(AttributeTargets.Property)]
	public class EmailAttribute : ValidationAttribute {
		protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
			if(value == null)
				return ValidationResult.Success;
			try {
				var address = value.ToString().ConvertToMailAddress();
				if(address == null)
					throw new Exception();
			}
			catch {
				return new ValidationResult(string.Format("{0} değeri bir E-Posta adresi formatında değil", value));
			}
			return ValidationResult.Success;
		}
	}
}
