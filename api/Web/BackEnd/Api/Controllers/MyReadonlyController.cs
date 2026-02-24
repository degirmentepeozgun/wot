using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Core.MessageList;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Api.Helper;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	public class MyReadOnlyController<T, Y> : ControllerBase where T : EntityBase<Y> {
		protected readonly BusinessBase<T, Y> Manager;
		protected readonly string Name;
		protected readonly ILogger Logger;
		const string _cacheKeyPattern = "{0}{1}{2}", _notFoundMessage = "{0} bulunamadı",
			_foundMessage = "{0} adet {1} bulundu", _page = "page", _pageSize = "pagesize",
			_forEdit = "foredit", _sortColumn = "sortcolumn", _sortDirection = "sortdirection",
			_get = "Get", _filter = "Filter", _officerPrefix = "O-", _clientPrefix = "U-",
			_customerPrefix = "S-";
		protected const string _id = "id";
		protected virtual string MessagePrefix {
			get;
		}
		protected const string DefaultLang = "tr";
		public MyReadOnlyController(BusinessBase<T, Y> manager, ILogger<MyReadOnlyController<T, Y>> logger) {
			Manager = manager;
			Name = typeof(T).Name;
			MessagePrefix = string.Empty;
			Logger = logger;
		}

		protected string GetCurrentUserName() => this.GetUserName();
		protected string GetCurrentUser() => this.GetUserId();
		protected string? GetCurrentGroup() => this.GetGroupId();
		protected short? GetCurrentEducationGroup() => this.GetEducationGroupId();
		protected bool IsDemoAccount() => this.IsDemoAcc();
		protected bool IsOfficer(string id) => id.StartsWith(_officerPrefix);
		protected bool IsClient(string id) => id.StartsWith(_clientPrefix);
		protected bool IsCustomer(string id) => id.StartsWith(_customerPrefix);
		protected string ConcatMessage(int recordCount, string? lang) {
			if(recordCount < 1)
				return string.Format(MessagesByLang.GetMessage(lang ?? DefaultLang, _notFoundMessage, MessagePrefix ?? Name));
			else
				return string.Format(MessagesByLang.GetMessage(lang ?? DefaultLang, _foundMessage, recordCount.ToString(), MessagePrefix ?? Name));
		}

		[HttpPost(_filter)]
		public virtual async Task<JsonResult> Filter(
			[FromBody] List<FilterCondition> filters,
			string? language = null,
			[FromQuery(Name = _page)] int page = 1,
			[FromQuery(Name = _pageSize)] int pageSize = 50,
			[FromQuery(Name = _sortColumn)] string? sortcolumn = null,
			[FromQuery(Name = _sortDirection)] bool sortdirection = false) {
			HttpResult<List<T>>? result;
			try {
				result = await Select(language, page, pageSize, sortcolumn, sortdirection, filters, false);
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result = new HttpResult<List<T>> {
					Message = mex.Message,
					StatusCode = mex.StatusCode ?? 700
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result = new HttpResult<List<T>> {
					StatusCode = 666
				};
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpGet(_get)]
		public virtual async Task<JsonResult> Get(string? language = null,
			[FromQuery(Name = _page)] int page = 1,
			[FromQuery(Name = _pageSize)] int pageSize = 50,
			[FromQuery(Name = _sortColumn)] string? sortcolumn = null,
			[FromQuery(Name = _sortDirection)] bool sortdirection = false) {
			HttpResult<List<T>>? result;
			try {
				result = await Select(language, page, pageSize, sortcolumn, sortdirection, null, false);
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result = new HttpResult<List<T>> {
					Message = mex.Message,
					StatusCode = mex.StatusCode ?? 700
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result = new HttpResult<List<T>> {
					StatusCode = 666
				};
			}
			return new JsonResult(result, Settings.options);
		}

		protected async virtual Task<HttpResult<List<T>>?> Select(string? language, int page, int pageSize, string? sortColumn, bool sortDirection,
				List<FilterCondition>? filters, bool foredit) {
			language ??= DefaultLang;
			try {
				string? sort = string.IsNullOrEmpty(sortColumn) ? null : sortColumn + (!sortDirection ? " desc" : string.Empty);
				pageSize = pageSize > 1000 ? 1000 : pageSize;
				if(foredit && (filters?.Count != 1 || filters[0].ColumnName != _id))
					foredit = false;

				var all = pageSize > 0 ? (filters?.Count > 0 ? await Manager.Filter(filters, page, pageSize, sort)
					: await Manager.SelectMany(page, pageSize, sort)) : null;

				if(foredit && filters?.Count == 1 && filters[0].ColumnName == _id
					&& all?.TotalCount == 1)
					Manager.LockObject(filters[0].Value, GetCurrentUser());
				HttpResult<List<T>> result = new() {
					Data = all != null ? all.Data : new List<T>(),
					StatusCode = 200,
					TotalRecords = all?.TotalCount ?? 0
				};
				if(Manager is BusinessCacheBase<T, Y>)
					result.CacheOptions = new() {
						Key = string.Format(_cacheKeyPattern,
						Request.Host, Request.Path, Request.QueryString),
						TimeSpan =
						(((BusinessCacheBase<T, Y>)Manager).Expire -
						DateTime.Now).TotalSeconds
					};
				return result;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				return new HttpResult<List<T>> {
					Message = mex.Message,
					StatusCode = 700
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				return new HttpResult<List<T>> {
					StatusCode = 666
				};
			}
		}
		[HttpGet("GetById")]
		public virtual async Task<JsonResult> GetById(Y id) {
			HttpResult<T>? result = new();
			try {
				if(string.IsNullOrEmpty(id?.ToString()))
					throw new MyException("Geçersiz ID");
				var item = await Manager.Get(id);
				result.StatusCode = 200;
				result.Data = item;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}
		[HttpGet("FilterById")]
		public virtual async Task<JsonResult> FilterById([FromQuery(Name="id")] Y[] id) {
			HttpResult<List<T>>? result = new();
			try {
				if(string.IsNullOrEmpty(id?.ToString()))
					throw new MyException("Geçersiz ID");

				var item = (await Manager.Filter(
					id.Select(x => new FilterCondition {
						ColumnName = _id,
						Value = x.ToString()
					})))?.Data;
				result.StatusCode = 200;
				result.Data = item;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}
	}
}