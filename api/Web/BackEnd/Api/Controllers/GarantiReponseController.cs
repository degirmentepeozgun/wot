using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Core.QueueProducer;
using Core.RedisCache;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class GarantiResponseController : ControllerBase {
		readonly IHttpContextAccessor HttpContextAccessor;
		readonly WithdrawManager Manager;
		public GarantiResponseController(
			WithdrawManager manager,
			IHttpContextAccessor httpContextAccessor) {
			Manager = manager;
			HttpContextAccessor = httpContextAccessor;
		}
		private static async Task LogRequest(HttpContext context) {
			try {
				StringBuilder requestContent = new();
				requestContent.AppendLine("=== Request Info ===");
				requestContent.AppendLine($"response = {context.Response.StatusCode}");
				requestContent.AppendLine($"method = {context.Request.Method.ToUpper()}");
				requestContent.AppendLine($"path = {context.Request.Path}");
				requestContent.AppendLine("-- headers");
				foreach(var (headerKey, headerValue) in context.Request.Headers)
					requestContent.AppendLine($"header = {headerKey}    value = {headerValue}");
				requestContent.AppendLine("-- body");
				context.Request.EnableBuffering();
				var requestReader = new StreamReader(context.Request.Body);
				var content = await requestReader.ReadToEndAsync();
				requestContent.AppendLine($"body = {content}");
				LogKeeper.LogInfo(requestContent.ToString());
			}
			catch(Exception) {

				throw;
			}
			//context.Request.Body.Position = context.Response.Body.Position = 0;
		}

		[HttpPost("Test")]
		public async Task<ContentResult> Test() {
			bool isSuccess = false;
			string? orderId = null, status = null, error = null, returnCode = null;
			Withdraw? order = null;
			try {
				try {
					var responseHash = Request.Form["hash"];
					char[] separator = new char[] { ':' };
					string? responseHashparams = Request.Form["hashparams"];
					var paramList = responseHashparams?.Split(separator);
					string digestData = string.Empty;
					foreach(string param in paramList)
						digestData += Request.Form[param];
					digestData += WithdrawManager.GetTestStoreKey();
					var sha = new System.Security.Cryptography.SHA512CryptoServiceProvider();
					byte[] hashbytes = System.Text.Encoding.GetEncoding("ISO-8859-9").GetBytes(digestData);
					byte[] inputbytes = sha.ComputeHash(hashbytes);
					var hashCalculated = BitConverter.ToString(inputbytes).Replace("-", "").ToUpper();
					bool isValidHash = false;
					if(responseHash.Equals(hashCalculated)) {
						//Response.Write("!!!!!MESAJ BANKADAN GELİYOR!!!!!");
						isValidHash = true;
						// Evet bankadan geliyor
						status = Request.Form["mdstatus"];
						returnCode = Request.Form["procreturncode"];
						error = Request.Form["mderrormessage"];
						string? transactionid = Request.Form["transid"];
						string? hostrefnum = Request.Form["hostrefnum"];
						string? authcode = Request.Form["authcode"];
						orderId = Request.Form["orderid"];
						Database db = new("Sales", "public");
						isSuccess = returnCode == "00";
						db.AddParameter(orderId);
						db.AddParameter(returnCode == "00" ? (short)130 : (short)4);
						db.AddParameter(returnCode);
						db.AddParameter(authcode ?? string.Empty);
						db.AddParameter(hostrefnum ?? string.Empty);
						db.AddParameter(transactionid ?? string.Empty);
						db.AddParameter(error ?? string.Empty);
						order = await db.Execute<Withdraw>("withdrawupdate", true);
					}
					else
						LogKeeper.LogWarning("Hash bilgileri " + responseHash + " ile " + hashCalculated + " aynı değil!");
					
				}
				catch{ }
				if(HttpContextAccessor?.HttpContext != null)
					await LogRequest(HttpContextAccessor.HttpContext);
				string? email = Request.Form["customeremailaddress"];
				if(!string.IsNullOrEmpty(email) && orderId != null && order != null) {
					var cache = MyCacheDB.GetCache("Order-Status-" + orderId);
					if(cache != null) {
						var orderDto = System.Text.Json.JsonSerializer.Deserialize<OrderDto>(cache);
						MyCacheDB.ClearCache("Order-Status-" + orderId);
						//LogKeeper.LogInfo(cache);
						RabbitMQProducer.PublishMessage(new Email {
							Body = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(orderDto),
							Title = "Siparişiniz Onaylandı",
							To = new string[] { email }
						}, "email");
						//EmailManager.SendEmail(orderDto.Customer.Email,
						//await (Manager as WithdrawManager).GetOrderSuccessEmailBody(orderDto),
						//"Siparişiniz Onaylandı");
					}
				}
				else if(orderId != null && order == null)
					throw new MyException(orderId + " nolu sipariş banka cevabı = " + returnCode + ", mdStatus = " + status + " Error:" + error) { Log = true };
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				//result.StatusCode = 700;
				//result.Message = mex.Message;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				LogKeeper.LogError(ex?.StackTrace ?? string.Empty);
				if(ex?.InnerException != null) {
					LogKeeper.LogError(ex.InnerException.Message);
					LogKeeper.LogError(ex.InnerException.StackTrace ?? string.Empty);
				}
				//result.StatusCode = 666;
			}
			//return result;
			string html = "";
			try {
				var receiveStream = Response.Body;
				using var readStream = new StreamReader(receiveStream, Encoding.UTF8);
				html = readStream.ReadToEnd();
			}
			catch {
			}
			return new ContentResult { Content = html, ContentType = "text/html", StatusCode = Response.StatusCode };
		}


		[HttpPost("Real")]
		public async Task<ContentResult> Real() {
			bool isSuccess = false;
			string? orderId = null, status = null, error = null, returnCode = null;
			Withdraw? order = null;
			try {
				try {
					var responseHash = Request.Form["hash"];
					char[] separator = new char[] { ':' };
					string? responseHashparams = Request.Form["hashparams"];
					var paramList = responseHashparams?.Split(separator);
					string digestData = string.Empty;
					foreach(string param in paramList)
						digestData += Request.Form[param];
					digestData += WithdrawManager.GetRealStoreKey();
					var sha = new System.Security.Cryptography.SHA512CryptoServiceProvider();
					byte[] hashbytes = System.Text.Encoding.GetEncoding("ISO-8859-9").GetBytes(digestData);
					byte[] inputbytes = sha.ComputeHash(hashbytes);
					var hashCalculated = BitConverter.ToString(inputbytes).Replace("-", "").ToUpper();
					bool isValidHash = false;
					if(responseHash.Equals(hashCalculated)) {
						//Response.Write("!!!!!MESAJ BANKADAN GELİYOR!!!!!");
						isValidHash = true;
						// Evet bankadan geliyor
						status = Request.Form["mdstatus"];
						returnCode = Request.Form["procreturncode"];
						error = Request.Form["mderrormessage"];
						string? transactionid = Request.Form["transid"];
						string? hostrefnum = Request.Form["hostrefnum"];
						string? authcode = Request.Form["authcode"];
						orderId = Request.Form["orderid"];
						Database db = new("Sales", "public");
						isSuccess = returnCode == "00";
						db.AddParameter(orderId);
						db.AddParameter(returnCode == "00" ? (short)2 : (short)4);
						db.AddParameter(returnCode);
						db.AddParameter(authcode ?? string.Empty);
						db.AddParameter(hostrefnum ?? string.Empty);
						db.AddParameter(transactionid ?? string.Empty);
						db.AddParameter(error ?? string.Empty);
						order = await db.Execute<Withdraw>("withdrawupdate", true);
					}
					else
						LogKeeper.LogWarning("Hash bilgileri " + responseHash + " ile " + hashCalculated + " aynı değil!");

				}
				catch { }
				if(HttpContextAccessor?.HttpContext != null)
					await LogRequest(HttpContextAccessor.HttpContext);
				string? email = Request.Form["customeremailaddress"];
				LogKeeper.LogInfo("E-posta = " + (email ?? "-") + ", OrderId = " + (orderId ?? "-"));
				if(!string.IsNullOrEmpty(email) && orderId != null && order != null) {
					var cache = MyCacheDB.GetCache("Order-Status-" + orderId);
					if(cache != null) {
						var orderDto = System.Text.Json.JsonSerializer.Deserialize<OrderDto>(cache);
						//LogKeeper.LogInfo(cache);
						MyCacheDB.ClearCache("Order-Status-" + orderId);
						if(returnCode == "00") {
							var _body = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(orderDto);
							RabbitMQProducer.PublishMessage(new Email {
								Body = _body,
								Title = "Siparişiniz Onaylandı",
								To = new string[] { email }
							}, "email");
							RabbitMQProducer.PublishMessage(new Email {
								Body = _body,
								Title = "Kitap12 - Sipariş İşlemi",
								To = new string[] { "destek@kitap12.com" }
							}, "email");
						}
						//var body = await (Manager as WithdrawManager).GetOrderSuccessEmailBody(orderDto);
						//Task.Run(async () => {
						//	await Task.Delay(1000);
						//	EmailManager.SendEmail(orderDto.Customer.Email, body, "Siparişiniz Onaylandı");
						//});
					}
				}
				else if(orderId != null && order == null)
					throw new MyException(orderId + " nolu sipariş banka cevabı = " + returnCode + ", mdStatus = " + status + " Error:" + error) { Log = true };
			}
			catch(MyException mex) {
				if(mex.Log)
					LogKeeper.LogError(mex.Message);
				//result.StatusCode = 700;
				//result.Message = mex.Message;
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
				LogKeeper.LogError(ex?.StackTrace ?? string.Empty);
				if(ex?.InnerException != null) {
					LogKeeper.LogError(ex.InnerException.Message);
					LogKeeper.LogError(ex.InnerException.StackTrace ?? string.Empty);
				}
				//result.StatusCode = 666;
			}
			//return result;
			string html = "";
			try {
				var receiveStream = Response.Body;
				using var readStream = new StreamReader(receiveStream, Encoding.UTF8);
				html = readStream.ReadToEnd();
			}
			catch {
			}
			return new ContentResult { Content = html, ContentType = "text/html", StatusCode = Response.StatusCode };
		}
	}
}