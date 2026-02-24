using System.Collections.Concurrent;
using System.Text.Json;

namespace Core.MessageList {
	public static class MessagesByLang {
		static string _defaultLang = "tr";
		static ConcurrentDictionary<string, IReadOnlyDictionary<string, string>> _messages = new();
		public static string GetMessage(string languageisocode, string message, params string[] args) {
			string m = message;
			string[]? subMessages = null;
			if(args?.Length > 0) {
				subMessages = new string[args.Length];
				for(int i = 0; i < args.Length; i++)
					subMessages[i] = GetMessage(languageisocode, args[i]);
			}
			if(languageisocode != _defaultLang)
				try {
					if(!_messages.ContainsKey(_defaultLang))
						ReadFromFile(_defaultLang);
					if(!_messages.ContainsKey(languageisocode))
						ReadFromFile(languageisocode);
					m = _messages[languageisocode][_messages[_defaultLang][message]];
				}
				catch {
				}
			if(subMessages?.Length > 0)
				m = string.Format(m, subMessages);
			return m;
		}

		static void ReadFromFile(string languageisocode) {
			try {
				var _text = File.ReadAllText(Path.Combine(Environment.CurrentDirectory, "lang", languageisocode, "list.json"));
				if(!string.IsNullOrEmpty(_text)) {
					var _content = JsonSerializer.Deserialize<Dictionary<string, string>>(_text);
					if(_content != null)
						_messages[languageisocode] = _content;
				}
			}
			catch {

			}
		}
	}
}