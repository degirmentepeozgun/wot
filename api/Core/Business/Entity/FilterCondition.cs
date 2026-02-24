using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.BusinessTemplates.Entity {
	public class FilterCondition {
		[Required]
		public string ColumnName {
			get; set;
		}
		public string? Operator {
			get; set;
		}
		[Required]
		public string Value {
			get; set;
		}
		[JsonIgnore]
		public string? GroupId {
			get; set;
		}
		[JsonIgnore]
		public bool? GroupAnd {
			get; set;
		}
		[JsonIgnore]
		public List<FilterCondition>? SubFilters {
			get; set;
		}
	}
}
