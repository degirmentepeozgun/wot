using Core.EntityTemplates.Concrete;
using Core.RedisCache;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class PopularSearchManager {

		const int quantityLimit = 100, dayLimit = 7;
		const string key = "kitap12-popularsearh", package = "packages", book = "books";
		public static IEnumerable<PopularItem>? GetPopularBooks(int count = quantityLimit) {
			return GetPopularSearchItems(count, book);
		}
		public static IEnumerable<PopularItem>? GetPopularPackages(int count = quantityLimit) {
			return GetPopularSearchItems(count, package);
		}
		static IEnumerable<PopularItem>? GetPopularSearchItems(int count, string type) {
			var list = MyCacheDB.GetGenericCache<List<PopularSearchItem>>(key + type);
			return list?.Select(x => new PopularItem {
				Id = x.Id,
				Count = x.Count
			})?//.OrderByDescending(x => x.Count)
			.Take(count);
		}
		static List<PopularSearchItem> ClearPopularSearchItems(DateTime today, string type, List<PopularSearchItem>? l = null) {
			var list = l ?? MyCacheDB.GetGenericCache<List<PopularSearchItem>>(key + type);
			DateTime maxDate = today.AddDays(-dayLimit);
			if(list?.Any() ?? false) {
				foreach(var item in list) {
					item.Stats = item.Stats.Where(x => x.Date > maxDate)?.ToList();
					item.Count = item.Stats?.Sum(x => x.Quantity) ?? 0;
				}
				list = list.Where(x => x.Count > 0)?.OrderByDescending(x => x.Count)?.Take(quantityLimit)?.ToList() ??
					new List<PopularSearchItem>();
				return list;
			}
			return new List<PopularSearchItem>();
		}
		public void PushPopularSearchPackageItems(List<PortalPackage> items) {
			PushPopularSearchItems(items, package);
		}
		public void PushPopularSearchBookItems(List<Book> items) {
			PushPopularSearchItems(items, book);
		}
		void PushPopularSearchItems<T>(List<T> items, string type) where T : EntityBase<string> {
			Task.Run(async () => {
				DateTime today = DateTime.Today;
				var list = MyCacheDB.GetGenericCache<List<PopularSearchItem>>(key + type);
				if(list?.Any() ?? false)
					foreach(var item in items) {
						var data = list.FirstOrDefault(x => x.Id == item.Id);
						if(data != null) {
							var stat = data.Stats.FirstOrDefault(x => x.Date == today);
							if(stat != null)
								stat.Quantity++;
							else
								data.Stats.Add(new PopularSearchItemStat {
									Date = today,
									Quantity = 1
								});
						}
						else {
							data = new PopularSearchItem {
								Id = item.Id,
								Stats = new List<PopularSearchItemStat> {
									new PopularSearchItemStat {
										Date = today,
										Quantity = 1
									}
								}
							};
							list.Add(data);
						}
					}
				else
					list = items.Select(x => new PopularSearchItem {
						Id = x.Id,
						Stats = new List<PopularSearchItemStat> {
							new PopularSearchItemStat {
								Date = today,
								Quantity = 1
							}
						}
					}).ToList();
				list = ClearPopularSearchItems(today, type, list);
				await MyCacheDB.SetCache(key + type, list);
			});
		}
	}
}
