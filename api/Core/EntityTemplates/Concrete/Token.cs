namespace Core.EntityTemplates.Concrete {
	public class Token {
		public string UserId {
			get; set;
		}
		public string[]? Roles {
			get; set;
		}
		public string? GroupId {
			get; set;
		}
		public string? SubGroupId {
			get; set;
		}
        public short? EducationGroup { get; set; }
    }
}
