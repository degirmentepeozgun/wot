using System.Text.Json;
using System.Text.Json.Serialization;

namespace Web.BackEnd.Api.Binder {
	public class StringConverters : JsonConverter<string> {
		public override string? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
			string? value = null;
			try {
				value = reader.GetString()?.Trim();
			}
			catch { }
			return string.IsNullOrEmpty(value) ? null : value;
		}

		public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options) {
			writer.WriteStringValue(value);
		}
	}
	public class GuidJsonConverter : JsonConverter<Guid?> {
		public override Guid? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
			string? value = null;
			try {
				value = reader.GetString()?.Trim();
				if(value != null)
					return Guid.Parse(value);
			}
			catch { }
			return null;
		}

		public override void Write(Utf8JsonWriter writer, Guid? value, JsonSerializerOptions options) {
			writer.WriteStringValue(value?.ToString());
		}
	}
}
