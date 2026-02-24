using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class PortalPackageOrderController : MyReadOnlyController<PortalPackageOrder, Guid?> {
		public PortalPackageOrderController(PortalPackageOrderManager manager,
			ILogger<PortalPackageOrderController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "Özel Paket Siparişi";
		}

		//protected override Task<HttpResult<List<PortalPackageOrder>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
		//	filters ??= new();
		//	filters.AddOnly(new FilterCondition {
		//		ColumnName = "CustomerId",
		//		Value = this.GetUserId()
		//	});
		//	return base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
		//}
		//[HttpGet("HasOrder")]
		//public async Task<JsonResult> HasOrder(string portalpackageid, string? language = null) {
		//	HttpResult<PortalPackageOrder>? result;
		//	try {
		//		result = new HttpResult<PortalPackageOrder> {
		//			Data = await (Manager as PortalPackageOrderManager).HasOrder(
		//				portalpackageid, this.GetUserId()),
		//			StatusCode = 200
		//		};
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result = new HttpResult<PortalPackageOrder> {
		//			Message = mex.Message,
		//			StatusCode = mex.StatusCode ?? 700
		//		};
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result = new HttpResult<PortalPackageOrder> {
		//			StatusCode = 666
		//		};
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
		//[HttpGet("GetOrderBooks")]
		//public async Task<JsonResult> GetOrderBooks(Guid orderid, string? language = null) {
		//	HttpResult<List<PortalPackageOrderBook>>? result;
		//	try {
		//		result = new HttpResult<List<PortalPackageOrderBook>> {
		//			Data = await (Manager as PortalPackageOrderManager).GetOrderBooks(
		//				orderid, this.GetUserId()),
		//			StatusCode = 200
		//		};
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result = new HttpResult<List<PortalPackageOrderBook>> {
		//			Message = mex.Message,
		//			StatusCode = mex.StatusCode ?? 700
		//		};
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result = new HttpResult<List<PortalPackageOrderBook>> {
		//			StatusCode = 666
		//		};
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpPost("Order")]
		//public async Task<JsonResult> Order(PortalPackageOrderDto dto, string? language = null) {
		//	HttpResult<OrderDto?>? result;
		//	try {
		//		var data = await (Manager as PortalPackageOrderManager).Order(
		//				dto.PortalPackageId, this.GetUserId(), dto.Month);
		//		result = new HttpResult<OrderDto?> {
		//			Data = new OrderDto { Code = data.Code, Id = data.Id.Value },
		//			StatusCode = 200
		//		};
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result = new HttpResult<OrderDto?> {
		//			Message = mex.Message,
		//			StatusCode = mex.StatusCode ?? 700
		//		};
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result = new HttpResult<OrderDto?> {
		//			StatusCode = 666
		//		};
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
		//[HttpPost("OrderBasket")]
		//public async Task<JsonResult> OrderBasket(BasketOrderDto dto, string? language = null) {
		//	HttpResult<OrderDto?>? result;
		//	try {
		//		var data = await (Manager as PortalPackageOrderManager).OrderBasket(
		//				dto.BasketId, this.GetUserId(), dto.TotalDiscountedPrice);
		//		result = new HttpResult<OrderDto?> {
		//			Data = new OrderDto { Code = data.Code, Id = data.Id.Value },
		//			StatusCode = 200
		//		};
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result = new HttpResult<OrderDto?> {
		//			Message = mex.Message,
		//			StatusCode = mex.StatusCode ?? 700
		//		};
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result = new HttpResult<OrderDto?> {
		//			StatusCode = 666
		//		};
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
	}
}