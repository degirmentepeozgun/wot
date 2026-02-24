using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.EntityTemplates.Extension;
using Core.QueueProducer;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.Entity.Dto;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class ContactController : MyControllerBase<Contact, Guid?> {
		public ContactController(ContactManager manager,
			ILogger<ContactController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "iletişim";
		}

		protected override Task<HttpResult<List<Contact>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			throw new MyException("Bu özellik kullanılamaz");
		}

		public async override Task<JsonResult> Edit([FromBody] Contact obj) {
			var result = await base.Edit(obj);
			if(((HttpResult<Contact>)result.Value)?.IsSuccess ?? false) {
				RabbitMQProducer.PublishMessage(new Email {
					Body = "<p>Sayın " + obj.Name.TitleCase() + ",</p><br/>Mesajınız tarafımıza ulaşmıştır. Bizlerle iletişime geçtiğiniz için teşekkür ederiz.",
					Language = "tr",
					Title = "Mesajınız Alındı",
					To = new string[] { obj.Email }
				}, "email");

				RabbitMQProducer.PublishMessage(new Email {
					Body = obj.Message + "\r\nEmail: " + obj.Email,
					Language = "tr",
					Title = "Kitap12 - İletişim Talebi",
					To = new string[] { "destek@kitap12.com" }
				}, "email");
			}
			return result;
		}

		[HttpPost("SaveCorpContact")]
		public virtual async Task<JsonResult> SaveCorpContact([FromBody] CorpContact obj) {
			HttpResult<Contact> result;
			try {
				if(obj?.Error != null)
					throw new MyException(obj.Error);
				obj.Name = obj.JobDescription + ' ' + obj.Name;
				if(obj.Message == null)
					obj.Message = string.Empty;
				obj.Message += "\r\nTel: " + obj.Phone;
				obj.Flags = 32;
				var contact = (Contact)obj;
				contact = await Manager.Edit(contact);
				result = new HttpResult<Contact> {
					Message = ConcatMessage(1, DefaultLang),
					Data = contact,
					StatusCode = 200,
					TotalRecords = 1
				};
				if(contact != null) {
					RabbitMQProducer.PublishMessage(new Email {
						Body = "<p>Sayın " + contact.Name.TitleCase() + ",</p><br/>Mesajınız tarafımıza ulaşmıştır. En kısa sürede sizlere geri dönüş sağlayacağız. Bizlerle iletişime geçtiğiniz için teşekkür ederiz.",
						Language = "tr",
						Title = "Mesajınız Alındı",
						To = new string[] { obj.Email }
					}, "email");
					RabbitMQProducer.PublishMessage(new Email {
						Body = contact.Message + "\r\nEmail: " + contact.Email,
						Language = "tr",
						Title = "Kitap12 - Kurumsal Abonelik Talebi",
						To = new string[] { "destek@kitap12.com" }
					}, "email");
				}
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex, this.GetUserId());
				result = new HttpResult<Contact> {
					StatusCode = 700,
					Message = mex.Message
				};
			}
			catch(UnauthorizedAccessException uex) {
				result = new HttpResult<Contact> {
					StatusCode = 401
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex, this.GetUserId());
				result = new HttpResult<Contact> {
					Message = ex.Message,
					StatusCode = 700
				};
			}
			return new JsonResult(result, Settings.options);
		}
	}
}