using Core.BusinessTemplates.Attribute;

namespace Core.BusinessTemplates.Entity {
	public class FilterBase<T> {
		[Condition(IsArray = true)]
		public T Id {
			get; 
			set;
		}
		[Condition(Operator = ">",Name ="CreateDateTime")]
		public DateTime? StartDate {
			get;
			set;
		}
		[Condition(Operator = "<",Name ="CreateDateTime")]
		public DateTime? EndDate {
			get;
			set;
		}
		[Condition(Operator = "&")]
		public short? Flags {
			get;
			set;
		}
	}
}
