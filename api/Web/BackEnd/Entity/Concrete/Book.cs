using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Book : EntityBase<string?> {
		public string Isbn {
			get; set;
		}
		[Sortable]
		public string Name {
			get; set;
		}
		public string? Keywords {
			get; set;
		}
		public int? TopicId {
			get; set;
		}
		public List<int>? AuthorIds {
			get; set;
		}
		public List<int>? ThemeIds {
			get; set;
		}
		public List<int>? GainIds {
			get; set;
		}
		public List<int>? SubThemeIds {
			get; set;
		}
		public short Issue {
			get; set;
		}
		[Sortable]
		public short Year {
			get; set;
		}
		public string? Language {
			get; set;
		}
		public short PageCount {
			get; set;
		}
		public string? PublisherId {
			get; set;
		}
		public short EducationGroup {
			get; set;
		}
		public override short? Flags {
			get; set;
		}
        public List<string>? Authors { get; set; }

        public string? Editor { get; set;
		}
		public string? Translator {
			get; set;
		}

		public string? Illustrator {
			get; set;
		}
		public bool ReadPermission => (Flags & 32) > 0;
		public bool Demo => (Flags & 512) > 0;
		public bool? IsEpub { get; set; }
        public string? Description { get; set; }
        public string? MetaKeys { get; set; }
    }
}
