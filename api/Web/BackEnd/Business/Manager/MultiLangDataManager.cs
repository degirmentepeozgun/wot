using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class MultiLangDataManager : BusinessBase<MultiLangData, Guid> {

		public async Task<MultiLangData?> GetSingleData(string id, string objectName, string propName, string langCode) {
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "ItemId",
				Value = id
			});
			filters.Add(new FilterCondition {
				ColumnName = "TableName",
				Value = objectName
			});
			filters.Add(new FilterCondition {
				ColumnName = "PropertyName",
				Value = propName
			});
			filters.Add(new FilterCondition {
				ColumnName = "LangCode",
				Value = langCode
			});
			return (await Filter(filters, 1, 1))?.Data?.FirstOrDefault();
		}


		public async Task<List<MultiLangData>?> GetData(IEnumerable<string> ids, string objectName, string langCode, string? propName = null) {
			List<FilterCondition> filters = new();
			filters.AddRange(ids.Select(x => new FilterCondition {
				ColumnName = "ItemId",
				Value = x
			}));
			filters.Add(new FilterCondition {
				ColumnName = "TableName",
				Value = objectName
			});
			filters.Add(new FilterCondition {
				ColumnName = "LangCode",
				Value = langCode
			});
			if(!string.IsNullOrEmpty(propName))
				filters.Add(new FilterCondition {
					ColumnName = "PropertyName",
					Value = propName
				});
			return (await Filter(filters))?.Data;
		}
	}
}
