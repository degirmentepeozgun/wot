using Core.BusinessTemplates.Entity;
using Core.BusinessTemplates.Extension;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.RedisCache;
using Microsoft.Extensions.Caching.Memory;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Text.Json;

namespace Core.BusinessTemplates.Concrete {
	public abstract class BusinessCacheBase<T, Y> : BusinessBase<T, Y> where T : EntityBase<Y> {
		readonly MyCacheDB? _cache;
		readonly IMemoryCache? _memCache;
		const string _cacheKeyPattern = "{0}-whole1", _contains = "Contains", _equals = "Equals",
			_startsWith = "StartsWith", _endsWith = "EndsWith", _hasFlag = "HasFlag";
		public int CacheMinutes = 1440;

		public BusinessCacheBase(MyCacheDB cache) {
			_cache = cache;
		}
		public BusinessCacheBase(IMemoryCache cache) {
			_memCache = cache;
		}
		public DateTime Expire {
			get; set;
		}
		DBReturnObject<List<T>>? GetCache(string key) {
			string? json = _cache != null ? MyCacheDB.GetCache(key) : _memCache.Get(key)?.ToString();
			if(!string.IsNullOrEmpty(json))
				return JsonSerializer.Deserialize<DBReturnObject<List<T>>>(json, Database.DeserializeOptions);
			return null;
		}
		async void SetCache(string key, string value) {
			TimeSpan minutesLeft = GetCacheExpireTimespan(CacheMinutes);
			Expire = DateTime.Now.Add(minutesLeft);
			if(_cache != null)
				await MyCacheDB.SetCache(key, value, minutesLeft);
			else
				_memCache.Set(key, value, minutesLeft);
		}

		void ClearCache(string key) {
			if(_cache != null)
				MyCacheDB.ClearCacheWithPattern(key);
			else
				_memCache?.Remove(key);
		}

		static TimeSpan GetCacheExpireTimespan(int expireminutes) {
			DateTime now = DateTime.Now;
			try {
				int minute = now.Minute, cacheTimeInSeconds = 60 * expireminutes;
				int seconds = (minute < 1 ? 0 : ((minute * 60) % cacheTimeInSeconds)) + now.Second;
				seconds = seconds > 0 ? cacheTimeInSeconds - seconds : cacheTimeInSeconds;
				return TimeSpan.FromSeconds(seconds);
			}
			catch {
				return TimeSpan.FromMinutes(expireminutes);
			}
		}

		public override async Task<DBReturnObject<List<T>>?> Filter(IEnumerable<FilterCondition> filters, int page = 1, int pageSize = int.MaxValue, string? sort = null, Database? tran = null) {
			string key = string.Format(_cacheKeyPattern, Name);
			DBReturnObject<List<T>>? data = GetCache(key);
			if(data?.Data == null || data.TotalCount == 0) {
				string? json = await SelectManyAsString();
				if(!string.IsNullOrEmpty(json)) {
					data = JsonSerializer.Deserialize<DBReturnObject<List<T>>>(json, Database.DeserializeOptions);
					if(data?.TotalCount > 0)
						SetCache(key, json);
				}
			}
			if(data != null)
				Modify(filters, sort, page, pageSize, ref data);
			return data;
		}

		void Modify(IEnumerable<FilterCondition>? filters, string? sort, int page, int pageSize, ref DBReturnObject<List<T>> data) {
			IQueryable<T>? query = null;
			bool isModified = false;
			if(filters != null || sort != null) {
				if(filters != null) {
					ParameterExpression parameter = Expression.Parameter(typeof(T));
					Expression? ex = null;
					var groups = filters.GroupBy(f => f.ColumnName, (key, g) => new {
						ColumnName = key,
						Rest = g.ToList()
					});
					Dictionary<string, List<FilterCondition>> andGroupFilters = new();
					Dictionary<string, List<FilterCondition>> orGroupFilters = new();
					foreach(var group in groups) {
						Expression? subEx = null;
						foreach(var item in group.Rest) {
							if(item.GroupId != null) {
								if(item.GroupAnd ?? false) {
									if(!andGroupFilters.ContainsKey(item.GroupId))
										andGroupFilters.Add(item.GroupId, new List<FilterCondition>());
									andGroupFilters[item.GroupId].Add(item);
								}
								else {
									if(!orGroupFilters.ContainsKey(item.GroupId))
										orGroupFilters.Add(item.GroupId, new List<FilterCondition>());
									orGroupFilters[item.GroupId].Add(item);
								}
								continue;
							}
							Expression? e = GenerateExpression(new FilterCondition {
								ColumnName = group.ColumnName,
								Value = item.Value,
								Operator = item.Operator
							}, parameter);
							if(e != null)
								subEx = subEx == null ? e : Expression.Or(e, subEx);
						}
						if(subEx != null)
							ex = ex == null ? subEx : Expression.And(ex, subEx);
					}
					if(orGroupFilters.Any()) {
						Expression? orGroupEx = null;
						foreach(var item in orGroupFilters) {
							foreach(var f in item.Value) {
								Expression? e = GenerateExpression(new FilterCondition {
									ColumnName = f.ColumnName,
									Value = f.Value,
									Operator = f.Operator
								}, parameter);
								if(e != null)
									orGroupEx = orGroupEx == null ? e : Expression.Or(e, orGroupEx);
							}
						}
						if(orGroupEx != null)
							ex = ex == null ? orGroupEx : Expression.Or(ex, orGroupEx);
					}
					if(andGroupFilters.Any()) {
						Expression? andGroupEx = null;
						foreach(var item in andGroupFilters) {
							foreach(var f in item.Value) {
								Expression? e = GenerateExpression(new FilterCondition {
									ColumnName = f.ColumnName,
									Value = f.Value,
									Operator = f.Operator
								}, parameter);
								if(e != null)
									andGroupEx = andGroupEx == null ? e : Expression.Or(e, andGroupEx);
							}
						}
						if(andGroupEx != null)
							ex = ex == null ? andGroupEx : Expression.And(ex, andGroupEx);
					}
					if(ex != null) {
						Expression<Func<T, bool>> lambda = Expression.Lambda<Func<T, bool>>(ex, parameter);
						query = data.Data.AsQueryable().Where(lambda);
						isModified = true;
					}
				}
				if(sort != null) {
					sort = CheckSort(sort);
					string[]? parts = sort?.Split(' ', '|', '\'');
					if(parts?.Length > 0) {
						query = (query ?? data.Data.AsQueryable()).OrderByWithColumnName(parts[0],
							parts.Length > 1 ? parts[parts.Length - 1] : null);
						isModified = true;
					}
				}
				if(query != null)
					data.TotalCount = query.Count();
			}
			if(data.TotalCount > pageSize && (pageSize < int.MaxValue || page > 1)) {
				int maxPage = (int)(Math.Ceiling((double)data.TotalCount / pageSize));
				if(page < 1)
					page = 1;
				else if(page > maxPage)
					page = maxPage;
				query = (query ?? data.Data.AsQueryable()).Skip((page - 1) * pageSize).Take(pageSize);
				isModified = true;
			}
			if(isModified)
				data.Data = query?.ToList();
		}

		public override async Task<DBReturnObject<List<T>>?> SelectMany(int page = 1, int pageSize = int.MaxValue, string? sort = null) {
			string key = string.Format(_cacheKeyPattern, Name);
			DBReturnObject<List<T>>? data = GetCache(key);
			if(data?.Data == null || data.TotalCount == 0) {
				string? json = await SelectManyAsString();
				if(!string.IsNullOrEmpty(json)) {
					data = JsonSerializer.Deserialize<DBReturnObject<List<T>>>(json, Database.DeserializeOptions);
					if(data?.TotalCount > 0)
						SetCache(key, json);
				}
			}
			if(data != null)
				Modify(null, sort, page, pageSize, ref data);
			return data;
		}
		Expression? GenerateExpression(FilterCondition condition, ParameterExpression parameter) {
			Expression? ex = null;
			foreach(var item in objProperties) {
				if(condition?.Value != null && item.Name.Equals(condition.ColumnName, StringComparison.OrdinalIgnoreCase)) {
					MemberExpression property = Expression.Property(parameter, item.Name);
					var type = property.Type;
					var converter = TypeDescriptor.GetConverter(type);
					var propertyValue = converter.ConvertFromInvariantString(condition.Value);
					var constant = Expression.Constant(propertyValue);
					Expression currentEx = BusinessCacheBase<T, Y>.CheckValue(property, Expression.Convert(constant, type), condition.Operator);
					ex = ex == null ? currentEx :
						Expression.And(ex, currentEx);
				}
			}
			return ex;
		}

		static Expression CheckValue(MemberExpression exp1, UnaryExpression exp2, string? op) {
			return op switch {
				"any" => Expression.Call(exp1, typeof(string).GetMethod(_contains, new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase)),
				"~" => Expression.Call(exp1, typeof(string).GetMethod(_contains, new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase)),
				"~~" => Expression.Call(exp1, typeof(string).GetMethod("Equals", new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase)),
				"=~" => Expression.Call(exp1, typeof(string).GetMethod(_startsWith, new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase)),
				"~=" => Expression.Call(exp1, typeof(string).GetMethod(_endsWith, new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase)),
				"!=~" => Expression.Not(Expression.Call(exp1, typeof(string).GetMethod(_startsWith, new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase))),
				"!~=" => Expression.Not(Expression.Call(exp1, typeof(string).GetMethod(_endsWith, new[] { typeof(string), typeof(StringComparison) }), exp2,
				Expression.Constant(StringComparison.OrdinalIgnoreCase))),
				">" => Expression.GreaterThan(exp1, exp2),
				">=" => Expression.GreaterThanOrEqual(exp1, exp2),
				"<" => Expression.LessThan(exp1, exp2),
				"<=" => Expression.LessThanOrEqual(exp1, exp2),
				"&" => Expression.Call(null, typeof(ShortExtensions).GetMethod(_hasFlag, new[] { typeof(short?), typeof(short?) }), exp1, exp2),
				"!&" => Expression.Not(Expression.Call(null, typeof(ShortExtensions).GetMethod(_hasFlag, new[] { typeof(short?), typeof(short?) }), exp1, exp2)),
				"!=" => Expression.NotEqual(exp1, exp2),
				_ => Expression.Equal(exp1, exp2)
			};
		}

		public void Remove(Y id) {
			string key = string.Format(_cacheKeyPattern, Name);
			var data = GetCache(key);
			int? length = data?.Data?.Count;
			if(length > 0)
				for(int i = 0; i < length; i++)
					if(data.Data[i].Id?.Equals(id) ?? false) {
						data.Data.RemoveAt(i);
						data.TotalCount--;
						SetCache(key, JsonSerializer.Serialize<DBReturnObject<List<T>>>(data));
						break;
					}
		}
		public async override Task<T?> Edit(T obj, Token? token = null, Database? dBWithTran = null, bool doNotCommit = false, List<FilterCondition>? filters = null, string? tranid = null) {
			T? item = await base.Edit(obj, token, dBWithTran, filters: filters, tranid: tranid);
			if(item == null)
				return item;
			string key = string.Format(_cacheKeyPattern, Name);
			var data = GetCache(key);
			int? length = data?.Data?.Count;
			if(string.IsNullOrEmpty(tranid) && length > 0) {
				bool found = false;
				for(int i = 0; i < length; i++)
					if(data.Data[i].Id?.Equals(item.Id) ?? false) {
						data.Data[i] = item;
						found = true;
						break;
					}
				if(!found) {
					data.Data.Add(item);
					data.TotalCount++;
				}
				SetCache(key, JsonSerializer.Serialize<DBReturnObject<List<T>>>(data));
			}
			else
				ClearCache(key);
			return item;
		}
		//public static object? ChangeType(object? value, Type conversion) {
		//	var t = conversion;
		//	if(t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>))) {
		//		if(value == null)
		//			return null;
		//		t = Nullable.GetUnderlyingType(t);
		//	}
		//	return Convert.ChangeType(value, t);
		//}
	}
}