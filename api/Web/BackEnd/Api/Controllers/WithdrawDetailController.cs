using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Core.Logging;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class WithdrawDetailController : ControllerBase {
		readonly WithdrawDetailManager WithdrawDetailManager;
		readonly ILogger<WithdrawDetailController> Logger;
		public WithdrawDetailController(WithdrawDetailManager manager, ILogger<WithdrawDetailController> logger)
		{
			WithdrawDetailManager = manager;
			Logger = logger;
		}

		[HttpGet("Get")]
		public async Task<HttpResult<List<WithdrawDetail>?>> Get([FromQuery] string orderId) {
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "WithdrawId",
				Value = orderId.ToUpper()
			});
			HttpResult<List<WithdrawDetail>?> result = new();
			try {
				var details = (await WithdrawDetailManager.Filter(filters))?.Data;
				if(details?.Any() ?? false) {
					result.StatusCode = 200;
					result.Data = details;
				}
				else
					throw new MyException("Sipariş Detayı Bulunamadı");
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}
	}
}