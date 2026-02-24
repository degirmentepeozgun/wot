using Core.BusinessTemplates.Statics;
using Core.BusinessTemplates.Abstract;
using Core.BusinessTemplates.Entity;
using Core.BusinessTemplates.Extension;
using Core.DataAccess;
using Core.EntityTemplates.Abstract;
using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Collections;

namespace Core.BusinessTemplates.Concrete {
	public abstract class BusinessBase<T, Y> where T : EntityBase<Y> {
		bool _irReversible = false, _keepHistory = false;
		const string _defaultSchema = "public", _history = "History", _log = "Log", _tableName = "tablename", _arr = "arr",
			_contains = "~", _casesensitive = "~~", _notContains = "!~", _singleQuo = "'", _escapedSingleQuo = "''", _percent = "%", _escapedPercent = "%%",
			_iLike = "ilike", _endsWith = "~=", _startsWith = "=~", _notiLike = "not ilike", _notEndsWith = "!~=",
			_notStartsWith = "!=~", _any = "any", _and = "&", _nand = "!&", _editRoleSuffix = "edit", _dateSuffix = "::date";
		protected const string _many = "Manyv3", _distinct = "ManyDistinct", _primaryKeyColumnName = "Id", _sortParameterName = "_sort",
			_filterParameterName = "_filters",
			_filterLimitException = "Filter Array Limit Exceed -> {0}",
			_filterRequiredException = "Filter Parameter Required -> {0}";
		readonly string[] _sortDirections = { "desc", "asc", "descending", "ascending" };
		readonly string[] _conditionOperators = { "=", "!=", "<", "<=", ">", ">=", _casesensitive, _contains, _endsWith, _startsWith, _notEndsWith, _notStartsWith,
			_and, _nand, _any };
		readonly Type type = typeof(T);
		readonly bool canDelete = typeof(DeletableEntity<Y>).IsAssignableFrom(typeof(T));


		protected readonly IEnumerable<PropertyInfo> objProperties = typeof(T).GetProperties().Where(x =>
		!typeof(IEnumerable<IEntity>).IsAssignableFrom(x.PropertyType) && !typeof(IEntity).IsAssignableFrom(x.PropertyType));
		List<string> _sortableColumnNames = new();
		public readonly JsonSerializerOptions CaseSensitiveOptions = new() {
			PropertyNameCaseInsensitive = true
		};
		public JsonSerializerOptions CamelCaseOptions => Database.SerializeOptions;
		protected string Name => type.Name;
		public string EditRole => Name.ToLower() + _editRoleSuffix;
		string? ExceptColumnNames = null;
		protected string? DatabaseName {
			get; set;
		}
		protected string? Schema {
			get; set;
		}
		private string? DefaultSortOrder {
			get; set;
		}
		protected void ActivateHistory(bool irReversible = false) {
			_keepHistory = true;
			_irReversible = irReversible;
		}
		public void LockObject(string? primaryKeyValue, string userId) {
			LockKeeper.Add(primaryKeyValue, this.GetType().Namespace ?? Name, userId);
		}
		static void UnlockObject(string? userId) {
			if(!string.IsNullOrEmpty(userId))
				LockKeeper.Remove(userId);
		}
		Database GetDatabase(Database? dbWithTran = null, bool keepAlive = false) {
			if(dbWithTran != null)
				return dbWithTran;
			var dataBase = (DatabaseName != null ? new Database(DatabaseName, Schema ?? _defaultSchema) :
				Schema != null ? new Database(schema: Schema) : new Database());
			dataBase.KeepAlive = keepAlive;
			return dataBase;
		}
		List<FilterCondition> OrganizeFilters(List<FilterCondition>? filters, T item) {
			List<FilterCondition> f = new();
			if(filters != null)
				foreach(var filter in filters)
					f.Add(filter);
			if(item.Id == null) {
				if(!propsCreated)
					CreateProperties();
				if(uniques != null && uniques.ContainsKey(string.Empty))
					foreach(var pk in uniques[string.Empty]) {
						var val = objProperties.FirstOrDefault(x => x.Name == pk)?.GetValue(item);
						if(val != null)
							f.Add(new FilterCondition {
								ColumnName = pk,
								Value = val.ToString()
							});
					}
			}
			else if(item.Id != null)
				f.Add(new FilterCondition {
					ColumnName = _primaryKeyColumnName,
					Value = item.Id.ToString()
				});
			return f;
		}

		public virtual async Task<bool> DeleteRecord(T obj, Token? token = null, Database? dBWithTran = null) {
			if(!canDelete)
				throw new UnauthorizedAccessException();
			Database db = GetDatabase(dBWithTran);
			db.AddParameter("_tablename", Name);
			db.AddParameter("_id", obj.Id.ToString());
			var result = await db.Execute<DBReturnObject<bool>>("deleteRecord", true);
			return result?.Data ?? false;
		}
		public virtual async Task<T?> Edit(T obj, Token? token = null, Database? dBWithTran = null, bool doNotCommit = false, List<FilterCondition>? filters = null, string? tranid = null) {
			try {
				if(obj == null)
					throw new ArgumentNullException(Name + " -> Edit");
				if(!Validate(obj, out string _message))
					throw new MyException(_message);
				Database db = GetDatabase(dBWithTran);
				List<FilterCondition> f = OrganizeFilters(filters, obj);
				T? oldData = (f?.Any() ?? false) ? (await Filter(f))?.Data?.FirstOrDefault() : null;
				bool hasResult = oldData != null;
				DBReturnObject<T>? result = null;
				bool keepHistory = false;
				obj = TrimObject(obj);
				DateTime? date = null;
				if(obj.LastUpdateTime.HasValue)
					date = obj.LastUpdateTime;
				bool delete = obj is DeletableEntity<Y> && (obj as DeletableEntity<Y>).Action == ModifyActions.delete;
				if(delete || !hasResult || !IsEqual(oldData, obj, out keepHistory)) {
					result = await db.Edit(Name, obj);
					if(dBWithTran != null && !doNotCommit)
						await dBWithTran.EndTransaction();
					if(hasResult && result?.Data != null)
						result.Data.Updated = true;
					if(keepHistory && result?.Data != null && token?.UserId != null && db != null) {
						db.EditLater(oldData, _history, _defaultSchema, _log, token?.UserId, Name, tranid, (short)(_irReversible ? 128 : 0));
						if(dBWithTran == null)
							db.RunPendingQueries();
					}
				}
				else if(hasResult && oldData != null)
					oldData.LastUpdateTime = date ?? DateTime.Now;
				if(hasResult && tranid == null)
					UnlockObject(token?.UserId);
				return result == null ? (!hasResult ? default : oldData) : result.Data;
			}
			catch {
				if(dBWithTran != null)
					await dBWithTran.EndTransaction(false);
				throw;
			}
		}

		T TrimObject(T obj) {
			if(!propsCreated)
				CreateProperties();
			if(stringProps != null)
				stringProps.ForEach(i => i.SetValue(obj, ((string)i.GetValue(obj, null))?.TrimAll(), Array.Empty<object>()));
			return obj;
		}

		public virtual async Task<List<T>?> EditMany(List<T> obj, Token? token = null, Database? dBWithTran = null, List<FilterCondition>? filters = null, string? tranid = null) {
			if(obj?.Count > 0) {
				List<T> list = new();
				tranid ??= Guid.NewGuid().ToString();
				DateTime now = DateTime.Now;
				foreach(var item in obj) {
					item.LastUpdateTime = now;
					T? edited = await Edit(item, token, dBWithTran, doNotCommit: true, tranid: tranid, filters: filters);
					if(edited != null)
						list.Add(edited);
				}
				return list;
			}
			else
				throw new InvalidOperationException(Name + " -> EditMany");
		}

		static IEnumerable<FilterCondition> DistinctFilters(IEnumerable<FilterCondition> filters) {
			return filters.GroupBy(x => new { x.ColumnName, x.Value, x.Operator, x.GroupId })
				.Select(group => group.First());
		}

		void AddSortAndFilterParameters(Database db, string? sort, IEnumerable<FilterCondition>? filters) {
			db.AddParameter(_sortParameterName, CheckSort(sort) ?? DefaultSortOrder ?? _primaryKeyColumnName);
			try {
				if(filters != null)
					db.AddParameter(_filterParameterName, GenerateConditions(DistinctFilters(filters)));
				else
					db.AddParameter(_filterParameterName, DBNull.Value);
			}
			catch(Exception ex) {

			}
		}
		object GetExceptColumns(IEnumerable<FilterCondition>? filters = null) {
			if(!propsCreated)
				CreateProperties();
			if(ExceptColumnNames == null)
				return DBNull.Value;
			if(filters?.Any(x => x.ColumnName.Equals(_primaryKeyColumnName, StringComparison.OrdinalIgnoreCase)) ?? false)
				return DBNull.Value;
			return ExceptColumnNames;
		}
		public async Task<string?> SelectManyAsString(int page = 1, int pageSize = Database._maxPageSize, string? sort = null) {
			Database db = GetDatabase();
			AddSortAndFilterParameters(db, sort, null);
			db.AddParameter(_tableName, Name.ToLower());
			db.AddParameter(_arr, Array.Empty<Y>());
			db.AddParameter(GetExceptColumns());
			return await db.SelectAsString(_many, page, pageSize);
		}
		public virtual async Task<DBReturnObject<List<T>>?> SelectMany(int page = 1, int pageSize = Database._maxPageSize, string? sort = null) {
			Database db = GetDatabase();
			AddSortAndFilterParameters(db, sort, null);
			db.AddParameter(_tableName, Name.ToLower());
			db.AddParameter(_arr, Array.Empty<Y>());
			db.AddParameter(GetExceptColumns());
			return await db.Select<T>(_many, page, pageSize);
		}
		public virtual async Task<DBReturnObject<List<T>>?> Filter(IEnumerable<FilterCondition> filters, int page = 1, int pageSize = Database._maxPageSize, string? sort = null, Database? tran = null) {
			Database db = GetDatabase(tran);
			AddSortAndFilterParameters(db, sort, filters);
			db.AddParameter(_tableName, Name.ToLower(Variables.EnCulture));
			db.AddParameter(_arr, Array.Empty<Y>());
			db.AddParameter(GetExceptColumns(filters));
			return await db.Select<T>(_many, page, pageSize);
		}
		public virtual async Task<DBReturnObject<List<T>>?> Distinct(string distinctColumnName, IEnumerable<FilterCondition> filters, int page = 1, int pageSize = Database._maxPageSize, string? sort = null) {
			Database db = GetDatabase();
			AddSortAndFilterParameters(db, sort, filters);
			db.AddParameter(_tableName, Name.ToLower(Variables.EnCulture));
			db.AddParameter(_arr, Array.Empty<Y>());
			db.AddParameter(distinctColumnName);
			return await db.Select<T>(_distinct, page, pageSize);
		}
		public async Task<T?> GetWithoutError(Y id, bool includeHiddenRecords = false, Database? tran = null) {
			try {
				return await Get(id, includeHiddenRecords, tran);
			}
			catch {
				return null;
			}
		}
		public virtual async Task<T?> Get(Y id, bool includeHiddenRecords = false, Database? tran = null) {
			if(id != null) {
				Database db = GetDatabase(tran);
				AddSortAndFilterParameters(db, null, new List<FilterCondition> {
				new FilterCondition{
					ColumnName = "id",
					Value = id.ToString()
				} });
				db.AddParameter(_tableName, Name.ToLower());
				db.AddParameter(_arr, Array.Empty<Y>());
				db.AddParameter(DBNull.Value);
				var result = await db.Select<T>(_many);
				if(result?.Data?.Count > 0) {
					T r = result.Data[0];
					if(!includeHiddenRecords && r.IsHidden)
						throw new MyException("Kayıt pasif olduğundan bu işlem yapılamaz");
					return r;
				}
				else
					throw new MyException(Name + " Not Found") { StatusCode = 404 };
			}
			return default(T);
		}

		protected string? GenerateConditions(IEnumerable<FilterCondition> filters, bool noprefix = false) {
			StringBuilder? sb = null;
			string? condition;
			string? lastColumnName = null;

			filters = filters.OrderBy(x => x.ColumnName);
			Dictionary<string, List<FilterCondition>> andGroupFilters = new();
			Dictionary<string, List<FilterCondition>> orGroupFilters = new();
			foreach(var item in filters) {
				if(item.Operator != null && !_conditionOperators.Contains(item.Operator))
					throw new FormatException(item.Operator);
				PropertyInfo? info = objProperties.FirstOrDefault(p => p.Name.Equals(item.ColumnName, StringComparison.OrdinalIgnoreCase));
				if(info == null)
					throw new ArgumentException(item.ColumnName);
				condition = BusinessBase<T, Y>.GenerateConditions(info, item.Operator, item.Value);
				if(condition == null)
					continue;
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
				if(sb == null)
					sb = new StringBuilder("((" + condition);
				else {
					if(lastColumnName == info.Name)
						sb.Append(" OR " + condition);
					else
						sb.Append(") AND (" + condition);
				}
				lastColumnName = info.Name;
			}
			if(sb != null)
				sb.Append("))");
			string? lastGroupId = lastColumnName = null;
			if(orGroupFilters.Any()) {
				StringBuilder? groupBuilder = null;
				foreach(var gf in orGroupFilters) {
					string key = gf.Key;
					foreach(var item in gf.Value) {
						PropertyInfo? info = objProperties.FirstOrDefault(p => p.Name.Equals(item.ColumnName, StringComparison.OrdinalIgnoreCase));
						if(info == null)
							throw new ArgumentException(item.ColumnName);
						condition = BusinessBase<T, Y>.GenerateConditions(info, item.Operator, item.Value);
						if(condition == null)
							continue;
						if(groupBuilder == null)
							groupBuilder = new StringBuilder("((" + condition);
						else {
							if(lastGroupId != key)
								groupBuilder.Append(")) OR ((" + condition);
							else {
								if(lastColumnName == info.Name)
									groupBuilder.Append(" OR " + condition);
								else
									groupBuilder.Append(") AND (" + condition);
							}
						}
						lastColumnName = info.Name;
						lastGroupId = key;
						if(item.SubFilters != null)
							groupBuilder.Append(") AND (" + GenerateConditions(item.SubFilters, true));
					}
				}
				if(groupBuilder != null) {
					groupBuilder.Append("))");
					if(sb == null)
						sb = groupBuilder;
					else
						sb.Append(" OR " + groupBuilder);
				}
			}
			lastGroupId = lastColumnName = null;
			if(andGroupFilters.Any()) {
				StringBuilder? groupBuilder = null;
				foreach(var gf in andGroupFilters) {
					string key = gf.Key;
					foreach(var item in gf.Value) {
						PropertyInfo? info = objProperties.FirstOrDefault(p => p.Name.Equals(item.ColumnName, StringComparison.OrdinalIgnoreCase));
						if(info == null)
							throw new ArgumentException(item.ColumnName);
						condition = BusinessBase<T, Y>.GenerateConditions(info, item.Operator, item.Value);
						if(condition == null)
							continue;
						if(groupBuilder == null)
							groupBuilder = new StringBuilder("((" + condition);
						else {
							if(lastGroupId != key)
								groupBuilder.Append(")) AND ((" + condition);
							else
								groupBuilder.Append(" OR " + condition);
						}
						lastGroupId = key;
						if(item.SubFilters != null)
							groupBuilder.Append(") OR (" + GenerateConditions(item.SubFilters, true));
					}
				}
				if(groupBuilder != null) {
					groupBuilder.Append("))");
					if(sb == null)
						sb = groupBuilder;
					else {
						sb.Insert(0, '(');
						sb.Append(") AND " + groupBuilder);
					}
				}
			}
			return sb != null ? (noprefix ? string.Empty : "WHERE ") + sb?.ToString() : null;
		}

		static string? GenerateConditions(PropertyInfo info, string? opt, string value) {
			if(value != null) {
				opt ??= "=";
				bool isAny = opt.ToLower() == _any;
				string? conditionValue = GenerateConditionValue(info.PropertyType, value, ref opt, out bool isDate, out bool isany);
				if(isany)
					isAny = true;
				string suffix = isDate ? _dateSuffix : string.Empty;
				if(isAny)
					return string.Format("{0} = ANY({1})", conditionValue, info.Name);
				if(!string.IsNullOrEmpty(conditionValue))
					return string.Format("{0} {1} {2}", info.Name + suffix, opt, conditionValue + suffix);
			}
			return null;
		}
		static string? GenerateConditionValue(Type type, string? value, ref string opt, out bool isDate, out bool isAny) {
			try {
				if(type.IsGenericType && type.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
					type = Nullable.GetUnderlyingType(type);
				object? val = null;
				isDate = isAny = false;
				bool isEnumText = false;
				if(type.IsEnum) {
					val = Enum.Parse(type, value);
					if(!int.TryParse(val.ToString(), out int w))
						isEnumText = true;
				}
				else if(type == typeof(Guid)) {
					isEnumText = true;
					val = Guid.Parse(value);
				}
				else if(type == typeof(DateTime)) {
					val = Convert.ChangeType(value, type, Variables.SystemCulture);
					if(opt == "=") {
						var date = Convert.ToDateTime(val);
						if(new DateTime(date.Year, date.Month, date.Day) == date)
							isDate = true;
					}
				}
				else if(type.IsGenericType) {
					isAny = true;
					val = Convert.ChangeType(value, type.GenericTypeArguments[0]);
				}
				else
					val = Convert.ChangeType(value, type);
				bool isText = false;
				if(val != null) {
					isText = isEnumText || type == typeof(string) || type == typeof(DateTime)
						|| typeof(IEnumerable).IsAssignableFrom(type) || type.IsGenericType;
					if(isEnumText || isText)
						val = value?.Replace(_singleQuo, _escapedSingleQuo).Replace(_percent, _escapedPercent);
					else if(opt.Contains(_contains))
						throw new FormatException(opt);
					switch(opt) {
						case _casesensitive:
							opt = _iLike;
							return _singleQuo + val + _singleQuo;
						case _contains:
							opt = _iLike;
							return _singleQuo + _escapedPercent + val + _escapedPercent + _singleQuo;
						case _endsWith:
							opt = _iLike;
							return _singleQuo + _escapedPercent + val + _singleQuo;
						case _startsWith:
							opt = _iLike;
							return _singleQuo + val + _escapedPercent + _singleQuo;
						case _notContains:
							opt = _notiLike;
							return _singleQuo + _escapedPercent + val + _escapedPercent + _singleQuo;
						case _notEndsWith:
							opt = _notiLike;
							return _singleQuo + _escapedPercent + val + _singleQuo;
						case _notStartsWith:
							opt = _notiLike;
							return _singleQuo + val + _escapedPercent + _singleQuo;
						case _and:
							return val + " > 0";
						case _nand:
							opt = _and;
							return val + " = 0";
						default:
							break;
					}
				}
				return isText ? _singleQuo + val + _singleQuo : val?.ToString();
			}
			catch {
				throw;
			}
		}
		void GetSortableColumns() {
			if(!_sortableColumnNames.Any()) {
				_sortableColumnNames.Add("random()");
				foreach(var prop in objProperties) {
					object[] attr = prop.GetCustomAttributes(false);
					if(attr?.Any() ?? false) {
						Sortable? _s = (Sortable?)attr.FirstOrDefault(x => x is Sortable);
						if(_s != null) {
							if(_s.Default)
								DefaultSortOrder = prop.Name + (_s.Direction ? string.Empty : " desc");
							_sortableColumnNames.Add(prop.Name);
						}
					}
				}
				if(!_sortableColumnNames.Any())
					_sortableColumnNames.Add(_primaryKeyColumnName);
				if(DefaultSortOrder == null)
					DefaultSortOrder = _sortableColumnNames[0];
			}
		}
		protected string? CheckSort(string? sort) {
			GetSortableColumns();
			if(sort == null && DefaultSortOrder == null)
				return _primaryKeyColumnName;
			string[]? parts = sort?.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);
			if(parts?.Length > 0 && parts.Length < 3)
				if(parts.Length == 1 || Array.IndexOf(_sortDirections, parts[1]) != -1) {
					string? s = _sortableColumnNames.FirstOrDefault(x => x.Equals(parts[0],
						StringComparison.OrdinalIgnoreCase));
					if(s != null)
						return s + (parts.Length > 1 ? ' ' + parts[1] : string.Empty);
				}
			return _primaryKeyColumnName;
		}
		public virtual bool Validate(T obj, out string message) {
			message = string.Empty;
			return true;
		}
		public virtual bool IsEqual(T? obj1, T? obj2, out bool keepHistory) {
			keepHistory = false;
			if(obj1 == null || obj2 == null)
				return false;
			if(obj1.ForceUpdate || obj2.ForceUpdate)
				return false;
			if(canDelete && (obj2 as DeletableEntity<Y>).Action == ModifyActions.delete) {
				keepHistory = _keepHistory;
				return false;
			}
			if(!propsCreated)
				CreateProperties();
			if(equality != null) {
				PropertyInfo? info = null;
				foreach(var u in uniques)
					foreach(var item in u.Value) {
						info = objProperties.FirstOrDefault(x => x.Name == item);
						if(info != null && info.GetValue(obj1)?.ToString() != info.GetValue(obj2)?.ToString()) {
							keepHistory = _keepHistory;
							return false;
						}
					}
				foreach(var item in equality) {
					info = objProperties.FirstOrDefault(x => x.Name == item);
					if(info != null && info.GetValue(obj1)?.ToString() != info.GetValue(obj2)?.ToString()) {
						if(ignoreHistory == null || (ignoreHistory != null && !ignoreHistory.Contains(item)))
							keepHistory = _keepHistory;
						return false;
					}
				}
				return true;
			}
			else
				return false;
		}

		Dictionary<string, List<string>>? uniques = null;
		List<string>? ignoreHistory = null;
		List<string>? equality = null;
		List<PropertyInfo>? stringProps = null;
		bool propsCreated = false;
		void CreateProperties() {
			lock(this) {
				List<string> selectProps = new();
				List<string> exceptFromArray = new();
				equality = new();
				uniques = new();
				foreach(var item in objProperties) {
					if(item.PropertyType == typeof(string))
						if(stringProps != null)
							stringProps.Add(item);
						else
							stringProps = new List<PropertyInfo> { item };
					if(item.Name == _primaryKeyColumnName)
						continue;
					var attrs = item.GetCustomAttributes();
					bool added = false;
					if(attrs != null) {
						foreach(var attr in attrs) {
							if(attr is IgnoreFromArrayAttribute)
								exceptFromArray.Add(item.Name);
							if(attr is IgnoreEqualityAttribute)
								added = true;
							if(attr is UniqueColumn) {
								string key = ((UniqueColumn)attr).Key ?? string.Empty;
								if(uniques.ContainsKey(key))
									uniques[key].Add(item.Name);
								else
									uniques[key] = new List<string> {
									item.Name
								};
								added = true;
							}
							else if(attr is IgnoreHistoryAttribute) {
								ignoreHistory ??= new();
								ignoreHistory.Add(item.Name);
							}
						}
					}
					if(!added)
						equality.Add(item.Name);
				}
				if(uniques.Count == 0)
					uniques.Add(string.Empty, new List<string> {
				_primaryKeyColumnName
				});
				if(exceptFromArray.Any())
					ExceptColumnNames = string.Join(',', exceptFromArray);
			}
			propsCreated = true;
		}
	}
}