using Core.BusinessTemplates.Concrete;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;

namespace Web.BackEnd.Api.Controllers {
	public class MyControllerBase<T, Y> : MyReadOnlyController<T, Y> where T : EntityBase<Y> {
		const string _edit = "Edit";
		public MyControllerBase(BusinessBase<T, Y> manager, ILogger<MyControllerBase<T, Y>> logger)
			: base(manager, logger) { }


		[HttpPost(_edit)]
		public virtual async Task<JsonResult> Edit([FromBody] T obj) {
			HttpResult<T> result;
			try {
				if(obj?.Error != null)
					throw new MyException(obj.Error);
				obj = await Manager.Edit(obj);
				result = new HttpResult<T> {
					Message = ConcatMessage(1, DefaultLang),
					Data = obj,
					StatusCode = 200,
					TotalRecords = 1
				};
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
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
				Logger.LogError(ex);
				result = new HttpResult<T> {
					Message = ex.Message,
					StatusCode = 700
				};
			}
			return new JsonResult(result, Settings.options);
		}
	}
}