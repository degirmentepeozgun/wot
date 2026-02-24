namespace Web.BackEnd.Entity.Dto {
	public class BookFilterDto {
        public List<BookFilterItem>? Publishers { get; set; }
		public List<BookFilterItem>? Themes {
			get; set;
		}

		public List<BookFilterItem>? EducationGroups {
			get; set;
		}

		public List<BookFilterItem>? Categories {
			get; set;
		}

		public List<BookFilterItem>? Years {
			get; set;
		}
	}
	public class BookFilterItem {
        public string Id { get; set; }
        public int Count { get; set; }
    }
}
