using Web.BackEnd.Entity.Concrete;

namespace Web.Entity.Dto {
	public class CorpContact : Contact {
		public string JobDescription {
			get; set;
		}
		public string Phone {
			get; set;
		}
	}
}
