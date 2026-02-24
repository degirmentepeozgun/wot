using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class BookQuizAnswer : EntityBase<Guid?> {
        public string? ClientId { get; set; }
        public string BookId {
			get; set;
		}
        public string BookQuizId { get; set; }
        public bool RightAnswered { get; set; }
        public char? GivenAnswer { get; set; }
    }
}
