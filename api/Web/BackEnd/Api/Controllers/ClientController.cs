using Api.Dto;
using Core.CryptoOrganizer;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Core.QueueProducer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Statics;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class ClientController : ControllerBase {
		readonly ClientManager Manager;
		readonly ILogger<ClientController> Logger;
		public ClientController(ClientManager manager,
			ILogger<ClientController> logger)
		{
			Manager = manager;
			Logger = logger;
		}

		[HttpGet("Get")]
		[UserAuth]
		public async Task<HttpResult<Client>?> Get() {
			HttpResult<Client> result = new();
			string userId = this.GetUserId();
			try {
				result.StatusCode = 200;
				result.Data = await Manager.GetClient(userId);
				result.TotalRecords = 1;
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


		[HttpPost("Activate")]
		public async Task<HttpResult<bool>?> Activate([FromBody] Client obj) {
			HttpResult<bool> result = new();
			try {
				string warning = StringOperations.CheckPassword(obj.Password);
				if(string.IsNullOrEmpty(warning)) {
					obj.Password = MyCryptoTools.Encrypt(obj.Password, true);
					var data = (await Manager.ActivateAccount(obj, obj.ActivationCode));
					result.StatusCode = 200;
					result.Data = data != null;
					result.TotalRecords = 1;
					if(data)
						RabbitMQProducer.PublishMessage(new Email {
							Body = "<p>Tebrikler! Önümüzdeki eğitim-öğretim yılı boyunca kullanabileceğiniz Kitap12 hesabınız aktif edildi. Şimdi sıradaki adıma geçip, cihazınıza mobil uygulamamızı indirip yükleyerek uygulamamızı açtıktan sonra, hesap aktifleştirme esnasında belirlediğiniz kullanıcı bilgilerinizle giriş yaparak yaşınıza yönelik tüm kitaplara erişim sağlayabilirsiniz.</p><p>Uygulama kurulumu hakkında bilgi almak için <a target='_blank' href='https://www.kitap12.com/how-to-download'>bu linki</a> ziyaret edebilirsiniz.</p>",
							Title = "Hesabınız Aktifleştirildi",
							To = new string[] { obj.Email }
						}, "email");
				}
				else
					throw new MyException(warning);
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
		
		[HttpPost("PasswordResetRequest")]
		public async Task<HttpResult<int>?> PasswordResetRequest([FromBody] PasswordResetCodeDto obj) {
			HttpResult<int> result = new();
			try {
				var client = await ClientManager.CheckOnlyEmail(obj.Email);
				if(client.Flags > 127)
					throw new MyException("Geçersiz E-Posta");
				var request = await ClientManager.AddEmailForNewPassword(obj.Email);
				if(string.IsNullOrEmpty(request.Code))
					throw new MyException("Sıkça kod talebinde bulunamazsınız");
				RabbitMQProducer.PublishMessage(new Email {
					Body = "<p>Sayın " + client.Name + ",</p><fieldset style='margin:12px;padding:12px'><legend>Yenileme Kodunuz</legend>" + request.Code + "</fieldset><b>Not: </b><i>Geçerlilik süresi " + request.ValidTimeInMinutes + " dakikadır.</i>",
					Language = "tr",
					Title = "Kitap12 Yönetim Paneli Şifre Yenileme Talebi",
					To = new string[] { obj.Email }
				}, "email");
				result.Message = '"' + obj.Email + "\" E-posta adresinize yenileme kodu gönderildi.";
				result.StatusCode = 200;
				result.Data = ClientManager._passwordRenewValidTimeInMinutes * 60;
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

		[HttpPost("PasswordUpdate")]
		public async Task<HttpResult<bool>> PasswordUpdate([FromBody] PasswordResetDto reset) {
			HttpResult<bool> result = new();
			try {
				var code = ClientManager.GetCodeForNewPassword(reset.Email);
				if(code != reset.Code)
					throw new MyException("Geçersiz Yenileme Kodu");
				if(!(await ClientManager.EditUserPassword(reset.Email, MyCryptoTools.Encrypt(reset.Password, true))))
					throw new MyException("Şifre yenilemede hata");
				result.Message = "Şifreniz Güncellenmiştir";
				result.StatusCode = 200;
				result.Data = true;
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