using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Wot;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class WotController : ControllerBase {
		readonly SubManager SubManager;
		readonly FeedManager FeedManager;
		readonly LeaderBoardsManager LeaderBoardsManager;
		readonly MissionSessionManager MissionSessionManager;
		public WotController(SubManager subManager, FeedManager feedManager, LeaderBoardsManager leaderBoardsManager, MissionSessionManager missionSessionManager) {
			SubManager = subManager;
			FeedManager = feedManager;
			LeaderBoardsManager = leaderBoardsManager;
			MissionSessionManager = missionSessionManager;	
		}

		[HttpPost("Subscription/Edit")]
		public async Task<JsonResult> Subscribe(Sub sub) {
			HttpResult<Sub>? result = new();
			try {
				result.StatusCode = 200;
				var data = await SubManager.GetWithoutError(sub.Id);
				if(data != null)
					throw new MyException("Email already in list");
				result.Data = await SubManager.Edit(sub);
				if(result.Data == null)
					throw new MyException("Operation failed");
				result.Message = "Request succeed";
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpPost("Feedback/Edit")]
		public async Task<JsonResult> SendFeedback(Web.BackEnd.Entity.Wot.Feedback feed) {
			HttpResult<Web.BackEnd.Entity.Wot.Feedback>? result = new();
			try {
				result.StatusCode = 200;
				result.Data = await FeedManager.Edit(feed);
				if(result.Data == null)
					throw new MyException("Operation failed");
				result.Message = "Request succeed";
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpPost("LeaderBoards/Edit")]
		public async Task<JsonResult> UpdateLeaderBoards(LeaderBoardsDTO leaderBoardsData) {
			HttpResult<Web.BackEnd.Entity.Wot.LeaderBoards>? result = new();
			try {
				var session = (await MissionSessionManager.Filter(new List<FilterCondition> {
					new FilterCondition{ ColumnName = "SessionGuid", Value = leaderBoardsData.SessionGuid },
					new FilterCondition{ ColumnName = "MissionKey", Value = leaderBoardsData.MissionKey },
					new FilterCondition{ ColumnName = "DeviceId", Value = leaderBoardsData.DeviceId }
				},1,1))?.Data?.FirstOrDefault();
				if(session == null || session.IsHidden)
					throw new MyException("User not found");
				session.Flags += 128;
				await MissionSessionManager.Edit(session);
				string payload = $"{leaderBoardsData.SessionGuid}|{leaderBoardsData.DeviceId}|{leaderBoardsData.MissionKey}|{leaderBoardsData.Point}";

				using var hmac = new HMACSHA256(Convert.FromBase64String(session.SecretKey));
				var computedHash = Convert.ToHexString(
					hmac.ComputeHash(Encoding.UTF8.GetBytes(payload))
				).ToLower();

				if(computedHash != leaderBoardsData.Signature.ToLower())
					throw new MyException("User not found");
				var oldScore = (await LeaderBoardsManager.GetLeaderBoardsOrder(leaderBoardsData.MissionKey, leaderBoardsData.DeviceId))?.Point ?? 0;
				var leaderBoards = new LeaderBoards {
					Point = leaderBoardsData.Point,
					MissionKey = leaderBoardsData.MissionKey,
					DeviceId = leaderBoardsData.DeviceId,
					Name = leaderBoardsData.Name
				};
				result.StatusCode = 200;
				bool update = false;
				if(oldScore > leaderBoards.Point)
					leaderBoards.Point = oldScore;
				else
					update = true;
				result.Data = update ? await LeaderBoardsManager.Edit(leaderBoards) : leaderBoards;
				if(result.Data != null)
					result.Data.SetNewRecord(oldScore > 0 && update);
				else
					throw new MyException("Operation failed");
				result.Message = "Request succeed";
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpGet("LeaderBoards/Get")]
		public async Task<JsonResult> GetLeaderBoards([FromQuery] string deviceId,
			[FromQuery] string missionKey) {
			HttpResult<List<LeaderBoardsOrderDTO>>? result = new();
			try {
				var session = (await MissionSessionManager.Filter(new List<FilterCondition>{
					new FilterCondition { ColumnName = "MissionKey", Value = missionKey },
					new FilterCondition { ColumnName = "DeviceId", Value = deviceId }
				}, 1, 1))?.Data?.FirstOrDefault();
				if(session == null)
					throw new MyException("User not found");
				var list = await LeaderBoardsManager.GetLeaderBoards(missionKey, deviceId);
				if(list == null)
					throw new MyException("Leaderboards not found");
				result.StatusCode = 200;
				result.Data = list;
				if(result.Data == null)
					throw new MyException("Operation failed");
				result.Message = "Request succeed";
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpPost("MissionSession/Start")]
		public async Task<JsonResult> StartMissionSession(Web.BackEnd.Entity.Wot.MissionSession missionSession) {
			HttpResult<Web.BackEnd.Entity.Wot.MissionSession>? result = new();
			try {
				result.StatusCode = 200;
				missionSession.SessionGuid = Guid.NewGuid().ToString();
				missionSession.Flags = 0;
				missionSession.SecretKey = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
				result.Data = await MissionSessionManager.Edit(missionSession);
				if(result.Data == null)
					throw new MyException("Operation failed");
				result.Message = "Request succeed";
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}
	}

	public class LeaderBoardsDTO {
        public int Point { get; set; }
        public string Name { get; set; }
        public string Signature { get; set; }
        public string DeviceId { get; set; }
		public string SessionGuid { get; set; }
		public string MissionKey { get; set; }
    }
}