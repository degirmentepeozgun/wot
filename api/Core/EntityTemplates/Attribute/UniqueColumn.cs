namespace Core.EntityTemplates.Attribute {
	[AttributeUsage(AttributeTargets.Property)]
	public class UniqueColumn : System.Attribute {
		public string? Key {
			get; set;
		}
	}
}
