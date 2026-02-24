namespace Web.BackEnd.Entity.Dto {
	public class BadgeDto {
		public int TotalQuizBadge {
			get; set;
		}
		public int TotalGameBadge {
			get; set;
		}
		public int TotalLoginBadge {
			get; set;
		}
		public bool LoginDone {
			get; set;
		}
		public bool QuestDone {
			get; set;
		}

        public string Key { get; set; }

        public int MinPlayLimit { get; set;
		}
		public int MaxPlayLimit {
			get; set;
		}
        public CalendarDto Calendar { get; set; }
    }
}
