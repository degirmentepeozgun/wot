using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class BadgeController : ControllerBase {
		readonly BookQuizAnswerManager BookQuizAnswerManager;
		readonly DailyBadgeCountManager DailyBadgeCountManager;
		public BadgeController(BookQuizAnswerManager manager, DailyBadgeCountManager dailyBadgeCountManager) {
			BookQuizAnswerManager = manager;
			DailyBadgeCountManager = dailyBadgeCountManager;
		}

		[HttpGet("Get")]
		public async Task<JsonResult> Get() {
			HttpResult<BadgeDto>? result = new();
			try {
				result.StatusCode = 200;
				List<FilterCondition> filters = new();
				filters.Add(new FilterCondition { ColumnName = "ClientId", Value = this.GetUserId() });
				filters.Add(new FilterCondition { ColumnName = "RightAnswered", Value = "true" });
				var process = (await BookQuizAnswerManager.Filter(filters))?.Data;
				result.Data = new BadgeDto { TotalQuizBadge = process?.Count ?? 0 };
				filters.RemoveAt(1);
				var counts = (await DailyBadgeCountManager.Filter(filters))?.Data?.FirstOrDefault();
				result.Data.TotalGameBadge = counts?.BadgeCount ?? 0;
				result.Data.TotalLoginBadge = counts?.LoginBadgeCount ?? 0;
				var now = DateTime.Now;
				bool today = now.Hour > 13;
				var reset = now;
				if(!today)
					reset = now.AddDays(-1);
				DateTime resetTime = new(reset.Year, reset.Month, reset.Day, 14, 0, 0);
				DateTime nexResetTime = resetTime.AddDays(1);
				if(resetTime.DayOfWeek == DayOfWeek.Sunday || resetTime.DayOfWeek == DayOfWeek.Saturday) {
					result.Data.MinPlayLimit = 10;
					result.Data.MaxPlayLimit = 30;
				}
				else {
					result.Data.MinPlayLimit = 3;
					result.Data.MaxPlayLimit = 10;
				}
				result.Data.LoginDone = counts?.LastLoginCompleteDateTime > resetTime;
				result.Data.QuestDone = counts?.LastQuestCompleteDateTime > resetTime;
				result.Data.Key = resetTime.Year.ToString() + resetTime.Month.ToString().PadLeft(2, '0') +
					resetTime.Day.ToString();
				result.Data.Calendar = new CalendarDto();
				result.Data.Calendar.SecondsLeft = (int)(nexResetTime - now).TotalSeconds;
				var dateNum = GetDateNum(now);
				result.Data.Calendar.Current = dateNum;
				result.Data.Calendar.Items = new();
				for(int i = 1, j = -1 * (dateNum - 1); i < 8; i++, j++)
					if(j == 0)
						result.Data.Calendar.Items.Add(new CalendarItemDto { D = now.Day, M = now.Month });
					else {
						var date = now.AddDays(j);
						result.Data.Calendar.Items.Add(new CalendarItemDto { D = date.Day, M = date.Month });
					}
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

		static int GetDateNum(DateTime date) {
			return date.DayOfWeek switch {
				DayOfWeek.Monday => 1,
				DayOfWeek.Tuesday => 2,
				DayOfWeek.Wednesday => 3,
				DayOfWeek.Thursday => 4,
				DayOfWeek.Friday => 5,
				DayOfWeek.Saturday => 6,
				DayOfWeek.Sunday => 7,
				_ => 0,
			};
		}

		[HttpPost("UpdateLoginBadge")]
		public async Task<JsonResult> UpdateLoginBadge() {
			HttpResult<bool>? result = new();
			try {
				await DailyBadgeCountManager.UpdateLoginBadge(this.GetUserId());
				result.Data = true;
				result.StatusCode = 200;
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

		[HttpPost("UpdateQuestBadge")]
		public async Task<JsonResult> UpdateQuestBadge() {
			HttpResult<bool>? result = new();
			try {
				await DailyBadgeCountManager.UpdateQuestBadge(this.GetUserId());
				result.Data = true;
				result.StatusCode = 200;
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
}