namespace Web.BackEnd.Entity.Dto {
	public class ClientEvent {
        public string Id { get; set; }
        public DateTime? CreateDateTime { get; set; }
        public string BookId { get; set; }
        public int Current { get; set; }
        public int Max { get; set; }
        public bool ReadDone { get; set; }
        public int RightCount { get; set;
		}
		public int WrongCount {
			get; set;
		}
	}
}
