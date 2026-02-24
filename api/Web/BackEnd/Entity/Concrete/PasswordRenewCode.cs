namespace Web.BackEnd.Entity.Concrete {
	public class PasswordRenewCode {
		public string Code {
			get; set;
		}
		public int ValidTimeInMinutes {
			get; set;
		}
	}
}
