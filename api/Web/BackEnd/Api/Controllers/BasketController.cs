using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Business.Manager;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class BasketController : ControllerBase {
		readonly BasketManager BasketManager;
		public BasketController(BasketManager manager, ILogger<BasketController> logger) {
			BasketManager = manager;
		}

		//[HttpGet("Get/Variables")]
		//public async Task<JsonResult> GetVariables() {
		//	HttpResult<BasketVariables>? result = new();
		//	try {
		//		result.StatusCode = 200;
		//		result.Data = await BasketManager.GetVariables(this.GetUserId());
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			LogKeeper.LogError(mex.Message);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		LogKeeper.LogError(ex.Message);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
		//[HttpGet("Get")]
		//public async Task<JsonResult> Get() {
		//	HttpResult<BasketDto>? result = new();
		//	try {
		//		result.StatusCode = 200;
		//		var basket = await BasketManager.ToggleActiveBasket(this.GetUserId());
		//		result.Data = await BasketManager.GetBasketItems(basket.Id.Value);
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			LogKeeper.LogError(mex.Message);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		LogKeeper.LogError(ex.Message);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpGet("Related")]
		//public async Task<JsonResult> Related() {
		//	HttpResult<List<Book>>? result = new();
		//	try {
		//		result.StatusCode = 200;
		//		var basket = await BasketManager.ToggleActiveBasket(this.GetUserId());
		//		result.Data = await BasketManager.GetRelatedBasketItems(basket.Id.Value)
		//		 ?? new List<Book>();
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			LogKeeper.LogError(mex.Message);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		LogKeeper.LogError(ex.Message);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpPost("Add")]
		//public async Task<JsonResult> Add(BasketItem item) {
		//	HttpResult<DateTime?>? result = new();
		//	try {
		//		result.StatusCode = 200;
		//		result.Data = await BasketManager.AddToBasket(item);
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			LogKeeper.LogError(mex.Message);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		LogKeeper.LogError(ex.Message);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpPost("Remove")]
		//public async Task<JsonResult> Remove(BasketItem item) {
		//	HttpResult<DateTime?>? result = new();
		//	try {
		//		result.StatusCode = 200;
		//		result.Data = await BasketManager.RemoveFromBasket(item);
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			LogKeeper.LogError(mex.Message);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		LogKeeper.LogError(ex.Message);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
	}
}