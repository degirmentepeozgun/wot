using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class DailyBadgeCountManager : BusinessBase<DailyBadgeCount, Guid?> {
		public async Task UpdateLoginBadge(string clientId) {
			var status = (await Filter(new List<FilterCondition>() {
				new FilterCondition() {
					ColumnName = "ClientId",
					Value = clientId
				}
			}, 1, 1))?.Data?.FirstOrDefault();
			status ??= await Edit(new DailyBadgeCount {
				BadgeCount = 0,
				ClientId = clientId,
				LoginBadgeCount = 0
			});
			int oldCount = status?.LoginBadgeCount ?? 0;
			Database db = new();
			db.AddParameter(clientId);
			status = await db.Execute<DailyBadgeCount>("web", "dailyLoginBadgeEdit", true);
			if(status == null || status.LoginBadgeCount <= oldCount)
				throw new MyException("Giriş ödülü güncellemesi yapılamadı. Lütfen tekrar deneyin");
		}

		public async Task UpdateQuestBadge(string clientId) {
			var status = (await Filter(new List<FilterCondition>() {
				new FilterCondition() {
					ColumnName = "ClientId",
					Value = clientId
				}
			}, 1, 1))?.Data?.FirstOrDefault();
			status ??= await Edit(new DailyBadgeCount {
				BadgeCount = 0,
				ClientId = clientId,
				LoginBadgeCount = 0
			});
			int oldCount = status?.BadgeCount ?? 0;
			Database db = new();
			db.AddParameter(clientId);
			status = await db.Execute<DailyBadgeCount>("web", "dailyQuestBadgeEdit", true);
			if(status == null || status.BadgeCount <= oldCount)
				throw new MyException("Günlük görev ödülü güncellemesi yapılamadı. Lütfen tekrar deneyin");
		}
	}
}
