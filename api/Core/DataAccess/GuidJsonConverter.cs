using System.Text.Json;
using System.Text.Json.Serialization;

namespace Core.DataAccess
{
    public class GuidJsonConverter : JsonConverter<Guid?> {
        public override Guid? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
            string value = null;
            try {
                value = reader.GetString().Trim();
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
