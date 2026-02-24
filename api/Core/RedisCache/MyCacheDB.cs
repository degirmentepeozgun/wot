using StackExchange.Redis;
using System.Text.Json;

namespace Core.RedisCache {
	public class MyCacheDB {
		static IDatabase? Cache;
		static ConnectionMultiplexer? ConnectionMultiplexer;
		static char _match = '*';
		static void Connect() {
			ConnectionMultiplexer = ConnectionMultiplexer.Connect("localhost:6379");
			Cache = ConnectionMultiplexer.GetDatabase();
		}

		public static string? GetCache(string key) {
			if(Cache == null)
				Connect();
			return Cache?.StringGet(key);
		}
		public static T? GetGenericCache<T>(string key) {
			if(Cache == null)
				Connect();
			var value = Cache?.StringGet(key);
			if(!string.IsNullOrEmpty(value))
				try {
					return JsonSerializer.Deserialize<T>(value);
				}
				catch {
					return default(T?);
				}
			return default(T?);
		}

		public static async Task<string>? GetHashCache(string key, string prefix, string id) {
			if(Cache == null)
				Connect();
			return await Cache?.HashGetAsync(key, new RedisValue(prefix + "-" + id));
		}
		public static async Task<T?> GetGenericHashCache<T>(string key, string prefix, string id) {
			if(Cache == null)
				Connect();
			var str = await Cache?.HashGetAsync(key, new RedisValue(prefix + "-" + id));
			if(!string.IsNullOrEmpty(str))
				return (T)Convert.ChangeType(str, typeof(T));
			return default(T?);
		}

		public static TimeSpan? GetExpireTime(string key) {
			return Cache?.KeyTimeToLive(key);
		}

		public static async Task SetCache(string key, string value, TimeSpan? ts = null) {
			if(Cache == null)
				Connect();
			if(Cache != null && !string.IsNullOrEmpty(value))
				await Cache.StringSetAsync(new RedisKey(key), new RedisValue(value), ts);
		}
		public static async Task SetCache<T>(string key, T value, TimeSpan? ts = null) where T : class {
			if(Cache == null)
				Connect();
			if(Cache != null && value != null)
				await Cache.StringSetAsync(new RedisKey(key), new RedisValue(JsonSerializer.Serialize(value)), ts);
		}
		public static async Task SetHashCache(string key, string prefix, string id, object value) {
			if(Cache == null)
				Connect();
			if(Cache != null && value != null)
				await Cache.HashSetAsync(key, prefix + "-" + id, JsonSerializer.Serialize(value));
		}
		public static void ClearCache(string key) {
			Cache?.KeyDelete(key);
		}
		public static async void ClearCacheWithPattern(string pattern) {
			if(ConnectionMultiplexer != null && Cache != null)
				foreach(var endpoint in ConnectionMultiplexer.GetEndPoints()) {
					var server = ConnectionMultiplexer.GetServer(endpoint);
					await foreach(var key in server.KeysAsync(pattern: pattern + _match))
						await Cache.KeyDeleteAsync(key);
				}
		}
	}
}