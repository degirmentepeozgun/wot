using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class ClientBook : DeletableEntity<string?> {
        public string BookId { get; set; }
        public DateTime? Expire {
			get; set;
		}
		public string? ClientId {
			get; set;
		}
		public string Name {
			get; set;
		}
		public byte Progress {
			get; set;
		}
        public int? PageCount { get; set; }
        public bool? IsEpub { get; set; }
        public string? CompanyBookId { get; set;
		}
		public string? CompanyId {
			get; set;
		}
		public string? OfficerId {
			get;
			set;
		}
        public bool? IsQuest {
			get => this.OfficerId != null && this.OfficerId != "System";
		}
    }
}
