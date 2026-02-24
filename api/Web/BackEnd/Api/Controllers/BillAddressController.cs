using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Core.Logging;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[UserAuth]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class BillAddressController : MyControllerBase<BillAddress, string?> {
		public BillAddressController(BillAddressManager manager,
			ILogger<BillAddressController> logger)
		  : base(manager, logger) {
		}

		protected override string MessagePrefix {
			get => "fatura adresi";
		}
		[HttpPost("RemoveAddress")]
		public async Task<HttpResult<bool>> RemoveAddress([FromBody] EntityBase<string> obj) {
			HttpResult<bool> result = new();
			try {
				result.Data = await (Manager as BillAddressManager).Delete(obj.Id, this.GetUserId());
				if(!result.Data)
					throw new MyException("İşlem Yapılamadı");
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

		protected override Task<HttpResult<List<BillAddress>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
			filters ??= new();
			var id = filters.FirstOrDefault(x => x.ColumnName.Equals(_id, StringComparison.OrdinalIgnoreCase))?.Value;
			filters.Clear();
			if (id != null)
				filters.Add(new FilterCondition {
					ColumnName = _id,
					Value = id
				});
			filters.AddOnly(new FilterCondition {
				ColumnName = "CustomerId",
				Value = this.GetCurrentUser()
			});
			filters.ExcludeHiddenRecords();
			return base.Select(language, page, pageSize, sortColumn, sortDirection, filters, false);
		}

		public async override Task<JsonResult> Edit([FromBody] BillAddress obj) {
			obj.CustomerId = this.GetUserId();
			return await base.Edit(obj);
		}
		[HttpPost("SetMain")]
		public async Task<HttpResult<bool>> SetMain([FromQuery] string id) {
			HttpResult<bool> result = new();
			try {
				result.Data = await (Manager as BillAddressManager).SetMain(id, this.GetUserId());
				if(!result.Data)
					throw new MyException("İşlem Yapılamadı");
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
	}
}