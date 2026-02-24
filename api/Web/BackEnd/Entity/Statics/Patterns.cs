namespace Web.BackEnd.Entity.Statics {
	internal static class Patterns {

		public const string WordNumMinus = @"^[\wığüşöçĞÜŞÖÇİ0-9- ]";
		public const string Wordables = @"^[\wığüşöçĞÜŞÖÇİ0-9\s\\/-]";
		public const string WordCommaDot = @"^[\wığüşöçĞÜŞÖÇİ,. ]";
		public const string GuidPattern = @"[0-9A-Fa-f]{8}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{12}";
	}
}
