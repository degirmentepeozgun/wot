using Core.BusinessTemplates.Concrete;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Helper;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	public class MyDeletableControllerBase<T, Y> : MyControllerBase<T, Y> where T : EntityBase<Y> {
		const string _delete = "Delete";
		public MyDeletableControllerBase(BusinessBase<T, Y> manager, ILogger<MyDeletableControllerBase<T, Y>> logger)
			: base(manager, logger) { }

		[HttpPost(_delete)]
		public async virtual Task<JsonResult> Delete([FromBody] EntityBase<Y> obj) {
			HttpResult<T> result;
			try {
				if(obj.Id == null)
					throw new MyException("Geçersiz Identity");
				if(obj?.Error != null)
					throw new MyException(obj.Error);
				var old = await Manager.Get(obj.Id, true);
				if(old == null)
					throw new MyException("Kayıt Bulunamadı");
				if(!(await Manager.DeleteRecord(old)))
					throw new MyException("İşlem Yapılamadı");
				result = new HttpResult<T> {
					Message = "Kayıt Silindi",
					StatusCode = 200
				};
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex, this.GetUserId());
				result = new HttpResult<T> {
					StatusCode = 700,
					Message = mex.Message
				};
			}
			catch(UnauthorizedAccessException uex) {
				result = new HttpResult<T> {
					StatusCode = 401
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex, this.GetUserId());
				result = new HttpResult<T> {
					Message = ex.Message,
					StatusCode = 700
				};
			}
			return new JsonResult(result, Settings.options);
		}
	}
}