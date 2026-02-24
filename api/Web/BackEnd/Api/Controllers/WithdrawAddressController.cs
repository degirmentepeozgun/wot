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
	public class WithdrawAddressController : ControllerBase {
		readonly WithdrawAddressManager WithdrawAddressManager;
		readonly ILogger<WithdrawAddressController> Logger;
		public WithdrawAddressController(WithdrawAddressManager manager, ILogger<WithdrawAddressController> logger)
		{
			WithdrawAddressManager = manager;
			Logger = logger;
		}

		[HttpGet("Get")]
		public async Task<HttpResult<WithdrawAddress?>> Get([FromQuery] string orderId) {
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "WithdrawId",
				Value = orderId.ToUpper()
			});
			HttpResult<WithdrawAddress?> result = new();
			try {
				var address = (await WithdrawAddressManager.Filter(filters))?.Data?.FirstOrDefault();
				if(address != null) {
					result.StatusCode = 200;
					result.Data = address;
				}
				else
					throw new MyException("Sipariş Fatura Adresi Bulunamadı");
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