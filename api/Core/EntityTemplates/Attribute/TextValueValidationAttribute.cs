using System.ComponentModel.DataAnnotations;

namespace Core.EntityTemplates.Attribute {
	[AttributeUsage(AttributeTargets.Property)]
	public class TextValueValidation : ValidationAttribute {
		readonly string[] _samples;
		protected TextValueValidation() {
		}
		public TextValueValidation(string[] samples) {
			_samples = samples;
		}
		public virtual string[] Samples {
			get => _samples;
		}
		protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
			if(value == null || _samples == null)
				return ValidationResult.Success;
			if(!_samples.Contains(value.ToString()))
				return new ValidationResult(string.Format("{0} değeri için \"{1}\" haricinde değer kullanılamaz",
					validationContext.MemberName, string.Join(',', _samples)));
			return ValidationResult.Success;
		}
	}
}
