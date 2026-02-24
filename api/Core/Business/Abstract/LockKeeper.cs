using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using System.Collections.Concurrent;

namespace Core.BusinessTemplates.Abstract {
	public static class LockKeeper {
		static readonly ConcurrentDictionary<string, LockObject> _locks = new();
		const int _expireInMinutes = 2;
		const string _keyPattern = "{0}-{1}";
		const string _warnMessage = "Bu kayıt için şu an farklı bir yetkili işlem yapıyor";
		public static void Add(string? primaryKeyValue, string objectName, string userGuid) {
			if(primaryKeyValue == null)
				return;
			string key = string.Format(_keyPattern, primaryKeyValue, objectName);
			DateTime expire = DateTime.Now.AddMinutes(_expireInMinutes);
			LockObject value = new() {
				Expire = expire,
				UserGuid = userGuid
			};
			if(HasLock(key)) {
				LockObject obj = _locks[key];
				if(obj.UserGuid == userGuid)
					_locks[key] = value;
				else
					throw new MyException(_warnMessage);
			}
			else
				_locks.TryAdd(key, value);
		}

		public static void Remove(string userGuid) {
			string[]? keys = _locks.Where(x => x.Value.UserGuid == userGuid).Select(y => y.Key).ToArray();
			if(keys?.Length > 0)
				foreach(string key in keys)
					_locks.TryRemove(key, out LockObject? obj);
		}

		static bool HasLock(string key) {
			RemoveExpiredLocks();
			return _locks.ContainsKey(key);
		}

		static void RemoveExpiredLocks() {
			DateTime now = DateTime.Now;
			var keysToRemove = _locks.Where(v => v.Value.Expire < now).Select(k => k.Key).ToList();
			keysToRemove.ForEach(key => _locks.TryRemove(key, out LockObject? obj));
		}
	}
}
