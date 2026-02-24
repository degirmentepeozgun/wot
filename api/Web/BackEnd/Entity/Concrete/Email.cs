namespace Web.BackEnd.Entity.Concrete {
	public class Email {
		public string? Language {
			get; set;
		}
		public string? Title {
			get; set;
		}
		public string Body {
			get; set;
		}
		public string[] To {
			get; set;
		}
	}
}
