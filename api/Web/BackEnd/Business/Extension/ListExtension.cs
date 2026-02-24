using Core.BusinessTemplates.Entity;

namespace Web.BackEnd.Business.Extension {
	public static class ListExtension {
		static string _hiddenColumnName = "Flags", _hiddenColumnValue = "128", _hiddenColumnOperator = "!&";

		public static void AddOnly(this List<FilterCondition> filters, FilterCondition condition) {
			filters.RemoveAll(x => x.ColumnName.Equals(condition.ColumnName, StringComparison.OrdinalIgnoreCase));
			filters.Add(condition);
		}
		public static void ExcludeHiddenRecords(this List<FilterCondition> filters) {
			filters.Add(new FilterCondition {
				ColumnName = _hiddenColumnName,
				Operator = _hiddenColumnOperator,
				Value = _hiddenColumnValue,
				GroupAnd = true,
				GroupId = Guid.NewGuid().ToString()
			});
		}

		public static void ExcludeSpecificFlag(this List<FilterCondition> filters, string flag) {
			filters.Add(new FilterCondition {
				ColumnName = _hiddenColumnName,
				Operator = _hiddenColumnOperator,
				Value = flag,
				GroupAnd = true,
				GroupId = Guid.NewGuid().ToString()
			});
		}
	}
}
