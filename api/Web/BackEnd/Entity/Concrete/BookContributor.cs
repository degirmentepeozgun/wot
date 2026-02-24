using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class BookContributor : EntityBase<string> {
        public string BookId { get; set; }
        public int ContributorId { get; set; }
        public short Rank { get; set; }
    }
}
