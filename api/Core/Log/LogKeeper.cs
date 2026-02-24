using Core.DataAccess;
using Microsoft.Extensions.Logging;

namespace Core.Logging {
	public static class LogKeeper {
		static string _error = "error", _warning = "warning", _info = "info", _schema = "Log", _funcName = "loginsert";
		public static void LogError(this ILogger logger, Exception ex, string? id = null) {
			LogThis(_error, logger, ex, id);
		}
		public static void LogWarning(this ILogger logger, Exception ex, string? id = null) {
			LogThis(_warning, logger, ex, id);
		}
		public static void LogInfo(this ILogger logger, Exception ex, string? id = null) {
			LogThis(_info, logger, ex, id);
		}
		public static void LogError(string text, string? id = null) {
			LogThis(_error, null, text, id);
		}
		public static void LogInfo(string text, string? id = null) {
			LogThis(_info, null, text, id);
		}
		public static void LogWarning(string text, string? id = null) {
			LogThis(_warning, null, text, id);
		}

		static void LogThis(string type, ILogger logger, Exception ex, string? id = null) {
			Task.Run(async () => {
				try {
					Database db = new(_schema);
					db.AddParameter(DateTime.Now);
					db.AddParameter(ex.Message);
					db.AddParameter(type);
					db.AddParameter(logger?.ToString() ?? string.Empty);
					db.AddParameter(ex.InnerException?.Message ?? string.Empty);
					db.AddParameter(ex.StackTrace ?? ex.InnerException?.StackTrace ?? string.Empty);
					db.AddParameter(ex.TargetSite?.ReflectedType?.FullName ?? string.Empty);
					await db.Execute<object>(_funcName);
				}
				catch {
					throw ex;
				}
			});
		}
		static void LogThis(string type, ILogger? logger, string text, string? id = null) {
			Task.Run(async () => {
				try {
					Database db = new(_schema);
					db.AddParameter(DateTime.Now);
					db.AddParameter(text);
					db.AddParameter(type);
					db.AddParameter(logger?.ToString() ?? string.Empty);
					await db.Execute<object>(_funcName);
				}
				catch {
					throw;
				}
			});
		}
	}
}
