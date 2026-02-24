namespace Web.BackEnd.Api.Dto {
	public class BookDto {
        public string Id { get; set; }
        public string BookId { get; set; }
        public short Flags {
			get; set;
		}
		public float? FligranOpacity {
			get {
				if((Flags & 1) == 1)
					return 0.1f;
				return null;
			}
		}
        public string Language { get; set; }
        public bool IsEpub { get; set; }
        public DateTime? ReadStartDateTime { get; set; }
    }
}
