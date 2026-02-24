using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Core.QueueProducer;
using Core.RedisCache;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Dto;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class WithdrawController : MyControllerBase<Withdraw, string?> {
		readonly IHttpContextAccessor HttpContextAccessor;
		public WithdrawController(WithdrawManager manager,
			ILogger<WithdrawController> logger, 
			IHttpContextAccessor httpContextAccessor)
		: base(manager, logger) {
			HttpContextAccessor = httpContextAccessor;
		}

		[UserAuth]
		public override Task<JsonResult> Get(string? language = null, [FromQuery(Name = "page")] int page = 1, [FromQuery(Name = "pagesize")] int pageSize = 50, [FromQuery(Name = "sortcolumn")] string? sortcolumn = null, [FromQuery(Name = "sortdirection")] bool sortdirection = false) {
			return base.Get(language, page, pageSize, sortcolumn, sortdirection);
		}
		[UserAuth]
		public override Task<JsonResult> Filter([FromBody] List<FilterCondition> filters, string? language = null, [FromQuery(Name = "page")] int page = 1, [FromQuery(Name = "pagesize")] int pageSize = 50, [FromQuery(Name = "sortcolumn")] string? sortcolumn = null, [FromQuery(Name = "sortdirection")] bool sortdirection = false) {
			return base.Filter(filters, language, page, pageSize, sortcolumn, sortdirection);
		}

		protected override async Task<HttpResult<List<Withdraw>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters = new();;
			filters.Add(new FilterCondition {
				ColumnName = "CustomerId",
				Value = this.GetUserId()
			});
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Operator = "&",
				Value = "2"
			});
			return await base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
		}
		[UserAuth]
		[HttpGet("CheckEmail")]
		public async Task<ContentResult> CheckEmailBody() {
			string html = string.Empty;
			try {
				html = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(new OrderDto {
					Order = new Withdraw {
						BankNo = 62,
						Id = "ASD123567",
						CouponCode = "ASDFASD",
						CouponDiscountAmount = 10,
						DiscountAmount = 200,
						TotalAmount = 4000,
						TotalDiscount = 210,
						FinalAmount = 3790
					},
					Address = new WithdrawAddress {
						Address = "Tantum Verde Mahallesi, 7312 sok. No:32",
						City = "01",
						County = "528",
						Country = "TR",
						TaxOffice = "Test",
						TaxNumber = "12341231",
						Title = "Ofis",
						Name = "Informascope"
					},
					Details = new List<WithdrawDetail> { 
						new WithdrawDetail {
							ExpireDateTime = DateTime.Now.AddYears(1),
							ProductName = "İlkokul Paketi",
							TotalAmount = 2000,
							DiscountAmount = 150
						},
						new WithdrawDetail {
							ExpireDateTime = DateTime.Now.AddYears(1),
							ProductName = "Ortaokul Paketi",
							TotalAmount = 2000,
							DiscountAmount = 50
						}
					}
				});
			}
			catch(Exception ex) {
				html += ex.Message;
			}
			return base.Content(html, "text/html");
		}

		[UserAuth]
		[HttpPost("Pay3D/Test")]
		public async Task<ContentResult> Pay3DTest(PaymentDto payment) {
			string? form = null, error = null;
			OrderDto? result = null;
			try {
				string customerId = this.GetUserId();
				result = await (Manager as WithdrawManager).Pay3DTEST(payment, HttpContextAccessor.GetIpAddress(), customerId);
				form = result?.ThreeDForm;
				if(string.IsNullOrEmpty(form))
					throw new MyException("İşleminiz Yapılamadı");
				else {
					if(result?.Order?.Id != null) {
						result.ThreeDForm = null;
						await MyCacheDB.SetCache("Order-Status-" + result.Order.Id, System.Text.Json.JsonSerializer.Serialize(result), TimeSpan.FromHours(24));
						await MyCacheDB.SetCache("Customer-LastOrderId-" + customerId, result.Order.Id, TimeSpan.FromMinutes(10));
					}
				}
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				error = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				error = "Error Logged";
			}
			return new ContentResult {
				ContentType = "text/html",
				Content = form ?? error ?? "Error"
			};
		}

		[UserAuth]
		[HttpPost("Pay3D/Real")]
		public async Task<ContentResult> Pay3DReal(PaymentDto payment, string? lang = null) {
			//HttpResult<string?> result = new();
			string? form = null, error = null;
			OrderDto? result = null;
			try {
				string customerId = this.GetUserId();
				var data = await (Manager as WithdrawManager).Pay3D(payment, HttpContextAccessor.GetIpAddress(), this.GetUserId(), lang);
				if(string.IsNullOrEmpty(data?.Order?.Id))
					throw new MyException("İşleminiz Yapılamadı");
				form = data.ThreeDForm;
				if(string.IsNullOrEmpty(form))
					throw new MyException("İşleminiz Yapılamadı");
				else {
					result = data;
					if(result?.Order?.Id != null) {
						result.ThreeDForm = null;
						await MyCacheDB.SetCache("Order-Status-" + result.Order.Id, System.Text.Json.JsonSerializer.Serialize(result), TimeSpan.FromHours(24));
						await MyCacheDB.SetCache("Customer-LastOrderId-" + customerId, result.Order.Id, TimeSpan.FromMinutes(10));
					}
				}
				//result.StatusCode = 200;
				//result.Data = data.Order.Id;
				//if(!string.IsNullOrEmpty(data?.Customer?.Email))
				//	RabbitMQProducer.PublishMessage(new Email {
				//		Body = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(data),
				//		Title = "Siparişiniz Onaylandı",
				//		To = new string[] { data.Customer.Email }
				//	}, "email");
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				error = mex.Message;
				//result.StatusCode = 700;
				//result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				error = ex.Message;
				//result.StatusCode = 666;
			}
			return new ContentResult {
				ContentType = "text/html",
				Content = form ?? error ?? "Error"
			};
		}

		//[UserAuth]
		//[HttpPost("Pay3D")]
		//public async Task<HttpResult<string?>> Pay3D(PaymentDto payment) {
		//	HttpResult<string?> result = new();
		//	try {
		//		var data = await (Manager as WithdrawManager).Pay3D(payment, HttpContextAccessor.GetIpAddress(), this.GetUserId());
		//		if(string.IsNullOrEmpty(data?.Order?.Id))
		//			throw new MyException("İşleminiz Yapılamadı");
		//		result.StatusCode = 200;
		//		result.Data = data.Order.Id;
		//		//if(!string.IsNullOrEmpty(data?.Customer?.Email))
		//		//	RabbitMQProducer.PublishMessage(new Email {
		//		//		Body = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(data),
		//		//		Title = "Siparişiniz Onaylandı",
		//		//		To = new string[] { data.Customer.Email }
		//		//	}, "email");
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result.StatusCode = 700;
		//		result.Message = mex.Message;
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result.StatusCode = 666;
		//	}
		//	return result;
		//}


		[UserAuth]
		[HttpPost("Pay")]
		public async Task<HttpResult<string?>> Pay(PaymentDto payment) {
			HttpResult<string?> result = new();
			try {
				var data = await (Manager as WithdrawManager).Pay(payment, HttpContextAccessor.GetIpAddress(), this.GetUserId());
				if(string.IsNullOrEmpty(data?.Order?.Id))
					throw new MyException("İşleminiz Yapılamadı");
				result.StatusCode = 200;
				result.Data = data.Order.Id;
				if(!string.IsNullOrEmpty(data?.Customer?.Email))
					RabbitMQProducer.PublishMessage(new Email {
						Body = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(data),
						Title = "Siparişiniz Onaylandı",
						To = new string[] { data.Customer.Email }
					}, "email");
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

		[UserAuth]
		[HttpGet("Check")]
		public async Task<HttpResult<WithdrawStatusDto?>> Check() {
			HttpResult<WithdrawStatusDto?> result = new();
			try {
				var orderId = MyCacheDB.GetCache("Customer-LastOrderId-" + this.GetUserId());
				var data = string.IsNullOrEmpty(orderId) ? null : await (Manager as WithdrawManager).CheckStatus(orderId);
				result.Data = data?.Id != null ? new WithdrawStatusDto {
					Id = data.Id,
					Flags = data.Flags,
					Message = data.ExceptionMessage
				} : null;
				result.StatusCode = 200;
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

		public async override Task<JsonResult> GetById(string id) {
			return await base.GetById(id.ToUpper());
		}
	}
}