using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;
using System.ComponentModel.DataAnnotations;
using Web.BackEnd.Entity.Statics;

namespace Web.BackEnd.Entity.Concrete {
	public class TotalPublisherReadsByMonth : EntityBase<Guid?> {

		[IgnoreEquality]
		[IgnoreHistory]
		public string? ProfileId {
			get; set;
		}
		[IgnoreEquality]
		[RegularExpression(@"^P-" + Patterns.GuidPattern + "$")]
		[IgnoreHistory]
		public string? PublisherId {
			get; set;
		}
		[IgnoreEquality]
		[RegularExpression(@"^C-" + Patterns.GuidPattern + "$")]
		[IgnoreHistory]
		public string? CompanyId {
			get; set;
		}
		[Range(0, int.MaxValue)]
		public int TotalProgress {
			get; set;
		}
	}
}
