namespace Web.BackEnd.Entity.Concrete {
	public class Notification  {
		public string Message {
			get; set;
		}
		public string? Parameters {
			get; set;
		}
		public DateTime Time {
			get => DateTime.Now;
		}
		public Guid Id {
			get => Guid.NewGuid();
		}
	}
}
