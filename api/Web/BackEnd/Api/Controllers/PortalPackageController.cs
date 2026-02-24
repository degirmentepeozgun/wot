using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class PortalPackageController : MyReadOnlyController<PortalPackage, string> {
		readonly PopularSearchManager PopularSearchManager;
		public PortalPackageController(PortalPackageManager manager,
			ILogger<PortalPackageController> logger, PopularSearchManager popularSearchManager)
		  : base(manager, logger) {
			PopularSearchManager = popularSearchManager;
		}

		protected override string MessagePrefix {
			get => "Özel Paket";
		}

		//[HttpGet("Find")]
		//public async Task<JsonResult> Find(string? language = null,
		//[FromQuery(Name = "mina")] int minAge = 0,
		//[FromQuery(Name = "maxa")] int maxAge = 99,
		//[FromQuery(Name = "minp")] int minPrice = 0,
		//[FromQuery(Name = "maxp")] int maxPrice = int.MaxValue,
		//[FromQuery(Name = "p")] string[]? publisherId = null,
		//[FromQuery(Name = "name")] string? name = null,
		//[FromQuery(Name = "ex")] string? exId = null,
		//[FromQuery(Name = "pg")] int page = 1,
		//[FromQuery(Name = "ps")] int pageSize = 50,
		//[FromQuery(Name = "sc")] string? sortcolumn = null,
		//[FromQuery(Name = "sd")] bool sortdirection = false) {
		//	HttpResult<List<PortalPackage>>? result;
		//	try {
		//		bool hasFilter = false;
		//		if(page == 1 && ((publisherId?.Any() ?? false) || !string.IsNullOrEmpty(name) ||
		//			minAge > 0 || maxAge < 99 || minPrice > 0 || maxPrice < int.MaxValue))
		//			hasFilter = true;
		//		List<FilterCondition> filters = new();
		//		filters.Add(new FilterCondition {
		//			ColumnName = "MinAge",
		//			Value = minAge.ToString(),
		//			Operator = ">=",
		//			GroupAnd = true,
		//			GroupId = _id + 'a'
		//		});
		//		filters.Add(new FilterCondition {
		//			ColumnName = "MinAge",
		//			Value = maxAge.ToString(),
		//			Operator = "<=",
		//			GroupAnd = true,
		//			GroupId = _id + 'b'
		//		});
		//		filters.Add(new FilterCondition {
		//			ColumnName = "MaxAge",
		//			Value = minAge.ToString(),
		//			Operator = ">=",
		//			GroupAnd = true,
		//			GroupId = _id + 'a'
		//		});
		//		filters.Add(new FilterCondition {
		//			ColumnName = "MaxAge",
		//			Value = maxAge.ToString(),
		//			Operator = "<=",
		//			GroupAnd = true,
		//			GroupId = _id + 'b'
		//		});
		//		filters.Add(new FilterCondition {
		//			ColumnName = "Month12Price",
		//			Value = minPrice.ToString(),
		//			Operator = ">="
		//		});
		//		filters.Add(new FilterCondition {
		//			ColumnName = "Month12Price",
		//			Value = maxPrice.ToString(),
		//			Operator = "<",
		//			GroupAnd = true,
		//			GroupId = _id
		//		});
		//		if(name?.Length > 2) {
		//			string groupid = Guid.NewGuid().ToString();
		//			filters.Add(new FilterCondition {
		//				ColumnName = "Name",
		//				Value = name,
		//				Operator = "~",
		//				GroupAnd = true,
		//				GroupId = groupid,
		//				SubFilters = new List<FilterCondition>() {
		//					new FilterCondition {
		//						ColumnName = "Keywords",
		//						Value = name,
		//						Operator = "~"
		//					}
		//				}
		//			});
		//		}
		//		if(!string.IsNullOrEmpty(exId))
		//			filters.Add(new FilterCondition {
		//				ColumnName = "Id",
		//				Operator = "!=",
		//				Value = exId
		//			});
		//		if(publisherId?.Any() ?? false)
		//			filters.AddRange(publisherId.Select(x => new FilterCondition {
		//				ColumnName = "ListOwnerId",
		//				Value = string.Concat(x[0].ToString().ToUpper(), x.AsSpan(1))
		//			}));
		//		result = await Select(language, page, pageSize, sortcolumn, sortdirection, filters, false);
		//		if(hasFilter && (result.Data?.Any() ?? false))
		//			PopularSearchManager.PushPopularSearchPackageItems(result.Data);
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result = new HttpResult<List<PortalPackage>> {
		//			Message = mex.Message,
		//			StatusCode = mex.StatusCode ?? 700
		//		};
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result = new HttpResult<List<PortalPackage>> {
		//			StatusCode = 666
		//		};
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//protected override Task<HttpResult<List<PortalPackage>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection, List<FilterCondition>? filters, bool foredit) {
		//	filters ??= new();
		//	string guid = Guid.NewGuid().ToString();
		//	string now = DateTime.Now.ToString(Variables.DateTimePattern);
		//	filters.Add(new FilterCondition {
		//		ColumnName = "PublishStartDate",
		//		Operator = "<",
		//		Value = now
		//	});
		//	filters.Add(new FilterCondition {
		//		ColumnName = "PublishEndDate",
		//		Operator = ">",
		//		Value = now
		//	});
		//	filters.ExcludeHiddenRecords();
		//	return base.Select(language, page, pageSize, sortColumn, sortDirection, filters, foredit);
		//}

		//[HttpGet("GetBooks")]
		//public async Task<JsonResult> GetBooks(string id, int? pg = 1, int? ps = int.MaxValue) {
		//	HttpResult<List<PortalPackageBook>>? result = new();
		//	try {
		//		if(string.IsNullOrEmpty(id))
		//			throw new MyException("Geçersiz ID");
		//		id = string.Concat(id[..2].ToUpper(), id.AsSpan(2));
		//		var item = await (Manager as PortalPackageManager).GetPortalPackageBooks(id, pg, ps);
		//		result.StatusCode = 200;
		//		result.Data = item?.Data;
		//		result.TotalRecords = item?.TotalCount ?? 0;
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
		//[HttpGet("GetPopular")]
		//public JsonResult GetPopular(int? count = 5) {
		//	HttpResult<IEnumerable<PopularItem>>? result = new();
		//	try {
		//		if(count < 1)
		//			count = 1;
		//		result.StatusCode = 200;
		//		result.Data = PopularSearchManager.GetPopularPackages(count.Value);
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}
		//[HttpGet("GetPackages")]
		//public async Task<JsonResult> GetPackages(string id) {
		//	HttpResult<IEnumerable<PortalPackage>>? result = new();
		//	try {
		//		result.StatusCode = 200;
		//		result.Data = await (Manager as PortalPackageManager).GetPackages(id.Split('_').Where(x => x.Length > 2)
		//			?.Select(x => string.Concat(x[..2].ToUpper(), x.AsSpan(2)))?.ToArray());
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpGet("Related")]
		//public async Task<JsonResult> Related(string id, int count = 4) {
		//	HttpResult<List<PortalPackage>>? result = new();
		//	try {
		//		if(count < 4)
		//			count = 4;
		//		else if(count > 20)
		//			count = 20;
		//		if(string.IsNullOrEmpty(id))
		//			throw new MyException("Geçersiz ID");
		//		id = string.Concat(id[..2].ToUpper(), id.AsSpan(2));
		//		var item = await (Manager as PortalPackageManager).GetRelatedPortalPackages(id, count);
		//		result.StatusCode = 200;
		//		result.Data = item;
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpGet("GetPackagesByBook")]
		//public async Task<JsonResult> GetPackagesByBook(string bookId, int count = 4) {
		//	HttpResult<List<PortalPackage>>? result = new();
		//	try {
		//		if(count < 4)
		//			count = 4;
		//		else if(count > 20)
		//			count = 20;
		//		if(string.IsNullOrEmpty(bookId))
		//			throw new MyException("Geçersiz ID");
		//		var item = await (Manager as PortalPackageManager).GetPackagesByBook(bookId, count);
		//		result.StatusCode = 200;
		//		result.Data = item;
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result.Message = mex.Message;
		//		result.StatusCode = mex.StatusCode ?? 700;
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result.StatusCode = 666;
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//[HttpPost("BulkInsert")]
		//public virtual async Task<JsonResult> Edit([FromBody] List<PortalPackage> obj) {
		//	HttpResult<bool> result;
		//	try {
		//		obj = await Manager.EditMany(obj);
		//		int count = obj?.Count ?? 0;
		//		if(count == 0)
		//			throw new MyException("Entegrasyon Yapılamadı");
		//		result = new HttpResult<bool> {
		//			Message = ConcatMessage(1, DefaultLang),
		//			Data = obj?.Count > 0,
		//			StatusCode = 200,
		//			TotalRecords = 1
		//		};
		//	}
		//	catch(MyException mex) {
		//		if(mex.Log)
		//			Logger.LogError(mex);
		//		result = new HttpResult<bool> {
		//			StatusCode = 700,
		//			Message = mex.Message
		//		};
		//	}
		//	catch(UnauthorizedAccessException uex) {
		//		result = new HttpResult<bool> {
		//			StatusCode = 401
		//		};
		//	}
		//	catch(Exception ex) {
		//		Logger.LogError(ex);
		//		result = new HttpResult<bool> {
		//			Message = ex.Message,
		//			StatusCode = 700
		//		};
		//	}
		//	return new JsonResult(result, Settings.options);
		//}

		//public override async Task<JsonResult> GetById(string id) {
		//	id = string.Concat(id[..2].ToUpper(), id.AsSpan(2));
		//	return await base.GetById(id);
		//}
	}
}