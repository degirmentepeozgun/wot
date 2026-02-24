namespace Web.BackEnd.Entity.Concrete {
	public class BookLight {
        public string Id { get; set; }
        public string Isbn {
			get; set;
		}
		public string Name {
			get; set;
		}
        public List<string>? Authors { get; set; }
        public bool? IsEpub { get; set; }
        public List<int>? ThemeIds { get; set; }
        public short? EducationGroup { get; set; }
    }
}
