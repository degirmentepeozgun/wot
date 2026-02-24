using Api.Dto;
using Core.CryptoOrganizer;
using Core.DataAccess;
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
using Web.BackEnd.Entity.Statics;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class CustomerController : ControllerBase {
		readonly CustomerManager Manager;
		readonly ILogger<CustomerController> Logger;
		public CustomerController(
			CustomerManager manager,
			ILogger<CustomerController> logger) {
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
				var data = await Manager.Get(userId);
				result.Data = new Client {
					AccountGroupLevelName = "",
					AccountGroupName = "",
					Code = "",
					CompanyName = "",
					CreateDateTime = data.CreateDateTime,
					Email = data.Email,
					Flags = data.Flags,
					UserName = data.UserName,
					TeacherName = "",
					Name = data.Name,
					SurName = data.SurName,
					SchoolName = "",
					Phone = data.Phone,
					Id = data.Id,
					ExpireDateTime = DateTime.Now.AddMonths(12)
				};
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

		[HttpPost("ApproveRegistration")]
		public async Task<HttpResult<bool>?> ApproveRegistration([FromBody] CustomerPhoneActivationDto data) {
			HttpResult<bool> result = new();
			string? cache = null;
			try {
				data.Phone = FormatPhoneNumber(data.Phone);
				string cacheKey = "sms-approveregistration-" + data.Phone;
				cache = MyCacheDB.GetCache(cacheKey);
				if(cache == null)
					throw new MyException("Geçersiz Telefon Numarası");
				var customer = System.Text.Json.JsonSerializer.Deserialize<Customer>(cache);
				if(customer?.SmsApproveCode != data.Code)
					throw new MyException("Geçersiz Aktivasyon Kodu");
				result.StatusCode = 200;
				result.Data = (await Manager.ActivateAccount(customer)) != null;
				result.TotalRecords = 1;
				//EmailManager.SendEmail(customer.Email,
				//	"<p>Sayın " + customer.Name + " " + customer.SurName.ToUpper() + ",</p><br/>Kitap12 ailesine hoşgeldiniz. <a href='https://www.kitap12.com'>www.kitap12.com</a> web sitemiz üzerinden belirli yaş gruplarına yönelik kitap içeriklerine göz atıp bu kitaplara erişim hakkında bilgi almak için bizlerle iletişime geçebilirsiniz.</i>",
				//	"Aramıza Hoşgeldiniz");
				if(!(customer.IsUpdating ?? false))
					RabbitMQProducer.PublishMessage(new Email {
						Body = "<div>Sayın  Kullanıcımız,</div><br/><div>Kitap12 platformuna gösterdiğiniz ilgi için teşekkür ederiz.</div>" +
						"<div>Sizleri aramızda görmekten memnuniyet duyuyoruz.</div><br/><div><a href='https://www.kitap12.com'>www.kitap12.com</a> web sitemiz üzerinden, farklı yaş gruplarına yönelik özenle seçilmiş kitap içeriklerini inceleyebilir; kitaplara erişim yöntemleri hakkında detaylı bilgi alabilirsiniz.</div><br/>" +
						"<div>Her türlü soru, görüş ve talepleriniz için bize <a href='mailto:destek@kitap12.com'>destek@kitap12.com</a> e-posta adresinden ulaşabilirsiniz.</div><br/><div>Saygılarımızla,</div><div>Kitap12 Destek Ekibi</div>",
						Language = "tr",
						Title = "Kitap12 Platformuna Hoş Geldiniz!",
						To = new string[] { customer.Email }
					}, "email");
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
				if(cache != null)
					MyCacheDB.ClearCache(cache);
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
				if(cache != null)
					MyCacheDB.ClearCache(cache);
			}
			return result;
		}

		[HttpGet("Sms/Test")]
		public HttpResult<bool> TestSms([FromQuery] string phone) {
			HttpResult<bool> result = new();
			try {

				throw new MyException("Servis Kapalı");

				var smsApproveCode = new Random().Next(100000, 999999).ToString();
				CustomerManager.SendSms(phone, smsApproveCode + " Kitap12 hesap onay kodu ile işleminize devam edebilirsiniz");
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

		[HttpGet("Email/Test")]
		public async Task<HttpResult<bool>> TestEmail([FromQuery] string? email, string? from, string? host, string? pwd, int? port) {
			HttpResult<bool> result = new();
			try {
				//throw new MyException("Servis Kapalı");
				EmailManager.SendEmail(email ?? "ozgunmnyazilim@gmail.com", "<div>Merhaba, Kitap12 ye katılım yaptınız. İyi güzel. Ama bir sormayı denediniz mi? Nedir bu Kitap12? Nasıldır? Ne yer ne içer? İşte günümüz insanı bu kadar umursamaz oldu maalesef. Peki ne yapmalıyız? Tabi ki hepsini boşverip oturalım eğlenelim. Şokomel partileri yapalım. Bırakalım bunu düşünmesi gerekenler düşünsün. Bim' den eko boyumu aldım geliyorum!!!</div>", "Siparişiniz Onaylandı", from, host, pwd, port);
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

		public static string FormatPhoneNumber(string input) {
			if(string.IsNullOrWhiteSpace(input))
				throw new ArgumentException("Geçersiz Telefon Numarası");

			// 1. Trim + boşlukları ve baştaki sıfırları temizle
			string cleaned = input.Trim().Replace(" ", "");

			// Baştaki tüm sıfırları temizle
			while(cleaned.StartsWith("0"))
				cleaned = cleaned.Substring(1);

			// 2. Uzunluk kontrolü
			if(cleaned.Length < 10 || cleaned.Length > 12)
				throw new ArgumentException("Geçersiz Telefon Numarası");

			// 3. Tüm karakterler rakam mı
			if(!cleaned.All(char.IsDigit))
				throw new ArgumentException("Geçersiz Telefon Numarası");

			// 4. Uzunluğa göre işleme
			if(cleaned.Length == 10)
				return "90" + cleaned;
			else if(cleaned.Length == 11)
				return "9" + cleaned;
			else if(cleaned.Length == 12)
				return cleaned;
			else
				throw new ArgumentException("Geçersiz Telefon Numarası");
		}

		[HttpPost("Register")]
		public async Task<HttpResult<bool>?> Register([FromBody] Customer obj) {
			HttpResult<bool> result = new();
			try {
				obj.Phone = FormatPhoneNumber(obj.Phone);
				string warning = StringOperations.CheckPassword(obj.Password);
				if(string.IsNullOrEmpty(warning)) {
					obj.Password = MyCryptoTools.Encrypt(obj.Password, true);
					result.StatusCode = 650;
					var customer = await Manager.TryActivateAccount(obj);
					result.Data = true; //customer?.Updated ?? false;
					result.TotalRecords = 1;
					//obj.Id = "S-" + Guid.NewGuid();
					obj.SmsApproveCode = new Random().Next(100000, 999999).ToString();
					obj.CreateDateTime = DateTime.Now;
					string cacheKey = "sms-approveregistration-" + obj.Phone;
					var cache = MyCacheDB.GetCache(cacheKey);
					if(cache != null)
						throw new MyException("3 dakika içinde tekrar onay kodu talep edemezsiniz");
					result.Message = obj.Phone;
					await MyCacheDB.SetCache(cacheKey, System.Text.Json.JsonSerializer.Serialize(obj), TimeSpan.FromSeconds(180));
					CustomerManager.SendSms(obj.Phone, obj.SmsApproveCode + " Kitap12 hesap onay kodu ile işleminize devam edebilirsiniz");
				}
				else
					throw new MyException(warning);
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Data = false;
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.Data = false;
				result.StatusCode = 666;
			}
			return result;
		}
		[HttpPost("PasswordResetRequest")]
		public async Task<HttpResult<int>?> PasswordResetRequest([FromBody] PasswordResetCodeDto obj) {
			HttpResult<int> result = new();
			try {
				var client = await CustomerManager.CheckOnlyEmail(obj.Email);
				if(client.Flags > 127)
					throw new MyException("Geçersiz E-Posta");
				var request = await CustomerManager.AddEmailForNewPassword(obj.Email);
				if(string.IsNullOrEmpty(request.Code))
					throw new MyException(CustomerManager._passwordRenewValidTimeInMinutes + " dakika içinde yalnızca 1 defa şifre yenileme talebinde bulunabilirsiniz.");
				RabbitMQProducer.PublishMessage(new Email {
					Body = "<div>Sayın Kullanıcımız,</div><br/><div>Kitap12 platformu üzerinden yapmış olduğunuz \"Şifremi Unuttum\" talebi başarıyla alınmıştır.</div><br/>" +
					"<div>Yeni bir şifre oluşturmak için aşağıdaki yenileme kodunu kullanabilirsiniz.</div><div>Bu kod, güvenliğiniz gereği yalnızca belirli bir süre için geçerli olacaktır.</div><br/>" +
					"<div style='font-size:larger !important;font-weight:bold !important'>🔗 " + request.Code + "</div><br/><div>Eğer bu talebi siz oluşturmadıysanız, lütfen bu e-postayı dikkate almayınız ve tarafımıza bilgi veriniz.</div><br/>" +
					"<div>Her türlü soru, görüş ve talepleriniz için bize <a href='mailto:destek@kitap12.com'>destek@kitap12.com</a> e-posta adresinden ulaşabilirsiniz.</div><br/><div>Saygılarımızla,</div><div>Kitap12 Destek Ekibi</div>",
					Language = "tr",
					Title = "Kitap12 - Şifre Yenileme Talebiniz",
					To = new string[] { obj.Email }
				}, "email");
				result.Message = '"' + obj.Email + "\" E-posta adresinize yenileme kodu gönderildi.";
				result.StatusCode = 200;
				result.Data = CustomerManager._passwordRenewValidTimeInMinutes * 60;
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
				var code = CustomerManager.GetCodeForNewPassword(reset.Email);
				if(code != reset.Code)
					throw new MyException("Geçersiz Yenileme Kodu");
				if(!await CustomerManager.EditUserPassword(reset.Email, MyCryptoTools.Encrypt(reset.Password, true)))
					throw new MyException("Şifre yenilemede hata");
				result.Message = "Şifreniz Güncellenmiştir";
				result.StatusCode = 200;
				result.Data = true;
				RabbitMQProducer.PublishMessage(new Email {
					Body = "<div>Sayın Kullanıcımız,</div><br/><div>Kitap12 hesabınıza ait şifre, talebiniz doğrultusunda başarıyla güncellenmiştir.</div><br/>" +
				"<div>Bu işlemi siz gerçekleştirmediyseniz, lütfen hesabınızın güvenliğini sağlamak amacıyla bizimle en kısa sürede iletişime geçiniz.</div><br/>" +
				"<div>Her türlü soru, görüş ve talepleriniz için bize <a href='mailto:destek@kitap12.com'>destek@kitap12.com</a> e-posta adresinden ulaşabilirsiniz.</div><br/><div>Saygılarımızla,</div><div>Kitap12 Destek Ekibi</div>",
					Language = "tr",
					Title = "Kitap12 - Şifreniz Başarıyla Güncellendi",
					To = new string[] { reset.Email }
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

		[HttpPost("Edit")]
		public async Task<HttpResult<Customer>> Edit([FromBody] CustomerDto c) {
			HttpResult<Customer> result = new();
			try {
				if(string.IsNullOrEmpty(c.SurName))
					throw new MyException("Soyisim boş geçilemez");
				string id = this.GetUserId();
				c.Phone = FormatPhoneNumber(c.Phone);
				var obj = await Manager.Get(id);
				if(obj == null)
					throw new MyException("Kullanıcı bulunamadı");
				if(c.Email.Trim() != obj.Email.Trim())
					await CustomerManager.CheckUpdateEmail(c.Email, id);
				var newOne = new Customer {
					Id = id,
					Name = (c.Name.Trim() + ' ' + (c.SurName?.Trim() ?? string.Empty)).Trim(),
					Email = c.Email.Trim()
				};
				await Manager.Edit(newOne);
				if(c.Phone != obj.Phone.Trim()) {
					obj.SmsApproveCode = new Random().Next(100000, 999999).ToString();
					string cacheKey = "sms-approveregistration-" + c.Phone;
					var cache = MyCacheDB.GetCache(cacheKey);
					if(cache != null)
						throw new MyException("3 dakika içinde tekrar onay kodu talep edemezsiniz");
					result.Message = c.Phone;
					obj.Phone = c.Phone;
					obj.IsUpdating = true;
					obj.Name = newOne.Name;
					obj.Email = newOne.Email;
					await MyCacheDB.SetCache(cacheKey, System.Text.Json.JsonSerializer.Serialize(obj), TimeSpan.FromSeconds(180));
					CustomerManager.SendSms(c.Phone, obj.SmsApproveCode + " Kitap12 hesap onay kodu ile işleminize devam edebilirsiniz");
					result.StatusCode = 650;
				}
				else {
					result.Message = "Hesap Bilgileriniz Güncellenmiştir";
					result.StatusCode = 200;
				}
				result.Data = obj;
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