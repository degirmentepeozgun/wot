using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class BookQuiz : EntityBase<Guid?> {
		public string Question {
			get; set;
		}
		public string AnswerA {
			get; set;
		}
		public string AnswerB {
			get; set;
		}
		public string AnswerC {
			get; set;
		}
		public string? AnswerD {
			get; set;
		}
		public char RightChoice {
			get; set;
		}
		public string? BookId {
			get; set;
		}
        public string? CompanyId { get; set;
		}
		public string? OfficerId {
			get; set;
		}
	}
}
