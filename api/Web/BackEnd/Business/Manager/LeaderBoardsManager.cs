using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Web.BackEnd.Entity.Wot;

namespace Web.BackEnd.Business.Manager {
	public class LeaderBoardsManager : BusinessBase<Web.BackEnd.Entity.Wot.LeaderBoards, string?> {
		public LeaderBoardsManager() {
			DatabaseName = "Wot";
			Schema = "public";
		}


		public async Task<LeaderBoards?> GetLeaderBoardsOrder(string missionKey, string deviceId) {
			return (await this.Filter(new List<FilterCondition> {
				new FilterCondition {
					ColumnName = "MissionKey",
					Value = missionKey,
				},
				new FilterCondition {
					ColumnName = "DeviceId",
					Value = deviceId,
				}
			}, 1, 1))?.Data?.FirstOrDefault();
		}
		public static async Task<List<LeaderBoardsOrderDTO>?> GetLeaderBoards(string missionKey, string deviceId) {
			Database db = new("Wot");
			db.AddParameter(deviceId);
			db.AddParameter(missionKey);
			return await db.Execute<List<LeaderBoardsOrderDTO>>("public", "leaderboards");
		}
	}

	public class LeaderBoardsOrderDTO {
		public int Point {
			get; set;
		}
		public string Id {
			get; set;
		}
		public string Name {
			get; set;
		}
		public int Order {
			get; set;
		}
	}
}
