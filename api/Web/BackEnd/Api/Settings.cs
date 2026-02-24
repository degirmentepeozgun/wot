using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using Web.BackEnd.Api.Binder;

namespace Web.BackEnd.Api {
	public static class Settings {
		readonly static DateTime _firstDate; 
		public static readonly CultureInfo trCulture = new("tr-TR", false);
		static Settings() {
			IConfigurationRoot root = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
			Version = Convert.ToSingle(root?.GetSection("Version")?.Value ?? "0");
			_firstDate = new(1970, 1, 9, 0, 0, 00);
		}

		public static readonly float Version;

		public static readonly JsonSerializerOptions options = new() {
			DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
			Converters = { new JsonStringEnumConverter(), new GuidJsonConverter() },
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
		};

		public static DateTime FirstDateTime => _firstDate;

		public static string MaskEmail(string email) {
			int addIndex = email.IndexOf('@');
			int dotIndex = email.IndexOf('.', addIndex);
			try {
				return email[0].ToString().ToLower() + string.Join(string.Empty, email.Substring(1, addIndex - 2).ToCharArray().Select(x => '*')) +
					email.Substring(addIndex - 1, 1).ToLower() + '@' + email.Substring(addIndex + 1, 1).ToLower() +
					string.Join(string.Empty, email.Substring(addIndex + 1, dotIndex - addIndex - 3).ToCharArray().Select(x => '*')) +
					email.Substring(dotIndex - 1, 1).ToLower() + email[dotIndex..].ToLower();
			}
			catch {
				return "-";
			}
		}
		public static string MaskPhone(string phone) {
			try {
				return string.Concat(string.Join(string.Empty, phone[..^4].ToCharArray().Select(x => '*')), phone.AsSpan(phone.Length - 4, 4));
			}
			catch {
				return "-";
			}
		}
	}
}
