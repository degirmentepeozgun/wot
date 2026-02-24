using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class ContributorManager : BusinessBase<Contributor, int> {
		public async Task<List<Contributor>?> GetContributorsByAuthorIds(List<int> list) {
			var authorIds = list.ToArray();
			if(authorIds?.Any() ?? false) {
				List<FilterCondition> filters = new();
				filters.AddRange(authorIds.Select(x => new FilterCondition {
					ColumnName = _primaryKeyColumnName,
					Value = x.ToString()
				}));
				var contributors = (await base.Filter(filters))?.Data;
				if(contributors?.Any() ?? false) {
					//contributors.ForEach(x => x.Rank = contributorBooks.FirstOrDefault(y => y.ContributorId == x.Id)?.Rank ?? 9999);
					//contributors = contributors.OrderByDescending(x => x.Type).ThenBy(x => x.Rank).ToList();
					contributors.Sort((x, y) => {
						return Array.IndexOf(authorIds, x.Id) - Array.IndexOf(authorIds, y.Id);
					});
					return contributors;
					//return new Contributor { Name = string.Join(", ", contributors.Select(x => x.Name)) };
				}
			}
			return null;
		}
	}
}
