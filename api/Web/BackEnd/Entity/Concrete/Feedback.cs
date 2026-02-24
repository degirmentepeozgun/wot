using Core.EntityTemplates.Concrete;
using System.ComponentModel.DataAnnotations;

namespace Web.BackEnd.Entity.Concrete {
	public class Feedback : EntityBase<Guid?> {
		public string? ClientId {
			get; set;
		}
		[StringLength(1000)]
		public string Content {
			get; set;
		}
		[StringLength(2000)]
		public string? DeviceType {
			get; set;
		}
	}
}
