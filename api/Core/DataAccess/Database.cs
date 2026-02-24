using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Core.DataAccess {
	public class Database {
		IConfiguration? _configuration;
		Dictionary<string, StringBuilder>? _pendingQueries;
		NpgsqlCommand? _command;
		NpgsqlTransaction? _tran;
		NpgsqlConnection? _connectionWithTransaction;
		Dictionary<string, object>? _parameters;
		List<object>? _endOfTranParameters;
		const string _connectionSource = "appsettings.json", _cmdTimeoutString = ";Timeout=300;CommandTimeout=300",
			_defaultDatabaseName = "Default", _defaultSchemaName = "public", _defaultSchemaPath = "Schema", _connectionPath = "ConnectionStrings:",
			_page = "page", _pageSize = "pagesize", _name = "name", _many = "Many", _select = "Select",
			_edit = "Edit", _object = "object", _parameterPrefix = "@", _parameterName = "p", _commandStartFormat = "SELECT {0}.{1}{2}(", _commandEnd = ");";
		const char _comma = ',';
		public const int _maxPageSize = 1000000;
		string? _conString, _schema;
		readonly bool _keepHistoryWithSameTran = false;
		public Database() {
			SetConnectionString();
		}

		public void SetSchema(string schema) { _schema = schema; }
		public Database(string databaseName = _defaultDatabaseName, string schema = _defaultSchemaName) {
			_schema = schema;
			SetConnectionString(databaseName);
		}
		public Database(bool hasTransaction, string databaseName, string schema) {
			_schema = schema;
			SetConnectionString(databaseName);
			if(hasTransaction)
				BeginTransaction().GetAwaiter();
		}
		public Database(bool hasTransaction, bool keepHistoryWithSameTran = false) {
			SetConnectionString();
			if(hasTransaction) {
				BeginTransaction().GetAwaiter();
				_keepHistoryWithSameTran = keepHistoryWithSameTran;
			}
		}
		public bool KeepAlive {
			get; set;
		}

		void CreateConfiguration() {
			if(_configuration == null) {
				try {
					_configuration = new ConfigurationBuilder()
						.AddJsonFile(_connectionSource, false).Build();
				}
				catch {
				}
			}
		}
		void SetConnectionString(string databaseName = _defaultDatabaseName) {
			CreateConfiguration();
			if(_configuration != null) {
				_conString = _configuration[_connectionPath + databaseName];
				if(_schema == null)
					_schema = _configuration[_connectionPath + _defaultSchemaPath];
			}
		}
		public static readonly JsonSerializerOptions SerializeOptions = new() {
			DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
			Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
			Converters = { new JsonStringEnumConverter(), new GuidJsonConverter() }
		};
		public static readonly JsonSerializerOptions DeserializeOptions = new() {
			DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
			Converters = { new JsonStringEnumConverter(), new GuidJsonConverter() },
			Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
			PropertyNameCaseInsensitive = true
		};
		public bool IsTransactionOpened => _tran != null;
		public async Task BeginTransaction() {
			if(_connectionWithTransaction == null) {
				_connectionWithTransaction = new(GetConnectionString());
				await _connectionWithTransaction.OpenAsync();
				_tran = await _connectionWithTransaction.BeginTransactionAsync();
			}
		}
		public void RunPendingQueries() {
			if(_pendingQueries != null)
				foreach(var item in _pendingQueries)
					Task.Run(async () => {
						try {
							using NpgsqlConnection con = new(GetConnectionString(item.Key));
							NpgsqlCommand cmd = new(item.Value?.ToString(), con);
							for(int i = 0; i < _endOfTranParameters?.Count; i++)
								cmd.Parameters.AddWithValue(_parameterName + i, _endOfTranParameters[i] ?? DBNull.Value);
							await con.OpenAsync();
							await cmd.ExecuteNonQueryAsync();
							await con.CloseAsync();
						}
						catch(Exception ex){ 
						}
					});
		}
		public async Task EndTransaction(bool commit = true) {
			if(_tran != null) {
				if(commit && _pendingQueries != null) {
					if(!_keepHistoryWithSameTran)
						RunPendingQueries();
					else if(_command != null) {
						for(int i = 0; i < _endOfTranParameters?.Count; i++)
							AddParameter(_parameterName + i, _endOfTranParameters[i] ?? DBNull.Value);
						_command.Connection = _connectionWithTransaction;
						_command.Transaction = _tran;
						await _command.ExecuteNonQueryAsync();
					}
				}
				if(commit)
					await _tran.CommitAsync();
				else
					await _tran.RollbackAsync();
				await _tran.DisposeAsync();
				_tran = null;
				try {
					if(_connectionWithTransaction != null) {
						await _connectionWithTransaction.CloseAsync();
						await _connectionWithTransaction.DisposeAsync();
					}
				}
				catch {
					throw;
				}
				_connectionWithTransaction = null;
			}
		}
		string? GetConnectionString() {
			return (!KeepAlive || _tran != null) ? _conString : (_conString + _cmdTimeoutString);
		}

		string? GetConnectionString(string databaseName) {
			CreateConfiguration();
			if(_configuration != null)
				return _configuration[_connectionPath + databaseName];
			return null;
		}
		public void AddSerializedParameter(string? name, object? obj) {
			AddParameter(name, JsonSerializer.Serialize(obj, SerializeOptions));
		}
		public void AddParameter(string? name, object? value) {
			if(string.IsNullOrEmpty(name))
				return;
			if(_parameters == null)
				_parameters = new Dictionary<string, object>();
			if(_parameters.ContainsKey(name.Trim()))
				_parameters[name.Trim()] = value ?? DBNull.Value;
			else
				_parameters.Add(name.Trim(), value ?? DBNull.Value);
		}
		public void AddParameter(object? value) {
			AddParameter(_parameterName + ((_parameters?.Count ?? 0) + 1), value);
		}
		void ClearParameters() {
			if(_parameters?.Count > 0)
				_parameters.Clear();
		}
		void PassParameters(string schema, string function, string action = _select) {
			if(_command == null)
				_command = new NpgsqlCommand();
			else
				_command.Parameters.Clear();
			StringBuilder sb = new();
			sb.AppendFormat(_commandStartFormat, schema, function, action);
			int counter = 0;
			string parameterName;
			if(_parameters != null)
				foreach(KeyValuePair<string, object> item in _parameters) {
					if(counter > 0)
						sb.Append(_comma);
					parameterName = _parameterPrefix + item.Key;
					sb.Append(parameterName);
					_command.Parameters.AddWithValue(parameterName, item.Value);
					counter++;
				}
			sb.Append(_commandEnd);
			_command.CommandText = sb.ToString();
		}
		public async Task<DBReturnObject<T>?> Edit<T>(string function, T obj, params object[] values) {
			try {
				AddParameter(_object, JsonSerializer.Serialize(obj, SerializeOptions));
				if(values != null)
					for(int i = 0; i < values.Length; i++)
						AddParameter(_parameterName + i, values[i] ?? DBNull.Value);
				PassParameters(_schema ?? _defaultSchemaName, function, _edit);
				return ConvertStringToType<DBReturnObject<T>>(await GetString());
			}
			catch(Exception ex) {
				if(_tran != null)
					await EndTransaction(false);
				throw ex;
			}
		}
		public void EditLater<T>(T obj, string function, string? schema = null, string databaseName = _defaultDatabaseName, params object?[] values) {
			if(_endOfTranParameters == null)
				_endOfTranParameters = new List<object>();
			_endOfTranParameters.Add(JsonSerializer.Serialize(obj, SerializeOptions));
			int count = _endOfTranParameters.Count;
			int currentCount = count;
			if(values != null)
				for(int i = 0; i < values.Length; i++, currentCount++)
					_endOfTranParameters.Add(values[i] ?? DBNull.Value);
			string cmd = string.Format(_commandStartFormat, schema ?? _schema ?? _defaultSchemaName, function, _edit);
			List<string> args = new();
			for(int i = count - 1; i < currentCount; i++)
				args.Add(_parameterPrefix + _parameterName + i);
			cmd += string.Join(_comma, args) + _commandEnd;
			if(_pendingQueries == null)
				_pendingQueries = new Dictionary<string, StringBuilder>();
			if(_pendingQueries.ContainsKey(databaseName))
				_pendingQueries[databaseName].Append(cmd);
			else
				_pendingQueries.Add(databaseName, new StringBuilder(cmd));
		}
		public async Task<DBReturnObject<T>?> EditMany<T>(string function, T obj, params object[] values) {
			AddParameter(_name, function);
			return await Edit<T>(_many, obj, values: values);
		}
		static T? ConvertStringToType<T>(string? innerResult) where T : class {
			T? outerResult = null;
			if(!string.IsNullOrEmpty(innerResult))
				try {
					outerResult = JsonSerializer.Deserialize<T>(innerResult, DeserializeOptions);
				}
				catch(Exception ex) {
					throw ex;
				}
			return outerResult;
		}
		public async Task<DBReturnObject<List<T>>?> Select<T>(string function, int page = 1, int pageSize = _maxPageSize) {
			string? innerResult = await SelectAsString(function, page, pageSize);
			return ConvertStringToType<DBReturnObject<List<T>>>(innerResult);
		}
		public async Task<T?> Execute<T>(string schema, string function, bool noSuffix = false) where T : class {
			PassParameters(schema, function, noSuffix ? string.Empty : _select);
			return ConvertStringToType<T>(await GetString());
		}
		public async Task<T?> Execute<T>(string function, bool noSuffix = false) where T : class {
			PassParameters(_schema ?? _defaultSchemaName, function, noSuffix ? string.Empty : _select);
			return ConvertStringToType<T>(await GetString());
		}
		public async Task<string?> Execute(string function, bool noSuffix = false) {
			PassParameters(_schema ?? _defaultSchemaName, function, noSuffix ? string.Empty : _select);
			return await GetString();
		}
		public async Task<string?> SelectAsString(string function, int page = 1, int pageSize = _maxPageSize) {
			AddParameter(_page, page);
			AddParameter(_pageSize, pageSize > _maxPageSize ? _maxPageSize : pageSize);
			PassParameters(_schema ?? _defaultSchemaName, function);
			return await GetString();
		}

		public async Task<string?> GetString() {
			string? innerResult = null;
			if(_command != null) {
				if(!IsTransactionOpened) {
					Exception? e = null;
					using(NpgsqlConnection con = new(GetConnectionString())) {
						try {
							_command.Connection = con;
							await con.OpenAsync();
							innerResult = (await _command.ExecuteScalarAsync())?.ToString();
							await con.CloseAsync();
						}
						catch(Exception ex) {
							e = ex;
						}
					}
					if(e != null)
						throw e;
				}
				else {
					try {
						_command.Connection = _connectionWithTransaction;
						_command.Transaction = _tran;
						innerResult = (await _command.ExecuteScalarAsync())?.ToString();
					}
					catch(Exception ex) {
						await EndTransaction(false);
						throw;
					}
				}
				ClearParameters();
			}
			return innerResult;
		}
	}
}