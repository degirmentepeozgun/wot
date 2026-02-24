using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Concrete {
	public class Contact : EntityBase<Guid?> {
		public string Message {
			get; set;
		}
		public string Topic {
			get; set;
		}
		[Email]
		public string Email {
			get; set;
		}
		public string Name {
			get; set;
		}
	}
}
