using Core.EntityTemplates.Concrete;
using System.ComponentModel.DataAnnotations;

namespace Web.BackEnd.Entity.Concrete {
	public class Customer : EntityBase<string?> {
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
		[Required]
		public string SurName {
			get; set;
		}
		public string? UserName {
			get; set;
		}
		[Required]
		public string Password {
			get; set;
		}

        public string? SmsApproveCode { get; set; }

        public bool? IsUpdating { get; set; }
    }
}
