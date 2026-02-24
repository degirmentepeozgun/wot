namespace Web.BackEnd.Entity.Dto {
	public class CalendarDto {
		public List<CalendarItemDto> Items {
			get; set;
		}
		public int Current {
			get; set;
		}
		public int SecondsLeft {
			get; set;
		}
	}
}
