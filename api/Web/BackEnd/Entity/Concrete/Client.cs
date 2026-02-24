using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Client : EntityBase<string?> {
		public string Code {
			get; set;
		}
		public string? CompanyId {
			get; set;
		}
		public string Email {
			get; set;
		}
		public string Phone {
			get; set;
		}
		public Guid? AccountGroupId {
			get; set;
		}
		public string? AccountGroupLevelName {
			get; set;
		}
		public string? AccountGroupName {
			get; set;
		}
		public string? Name {
			get; set;
		}
		public string? SurName {
			get; set;
		}
		public string? UserName {
			get; set;
		}
		public string Password {
			get; set;
		}
        public DateTime? ExpireDateTime { get; set;
		}
		public string? ActivationCode {
			get; set;
		}
        public Guid? PackageId { get; set; }
        public string? TeacherName { get; set; }
        public string? SchoolName { get; set; }
		public string? CompanyName { get; set; }
	}
}
