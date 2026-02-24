using System.Globalization;

namespace Core.BusinessTemplates.Statics
{
    public static class Variables
    {
		public static CultureInfo SystemCulture = CultureInfo.InvariantCulture;
		public static CultureInfo EnCulture = CultureInfo.GetCultureInfo("en-US");
		public static CultureInfo TrCulture = CultureInfo.GetCultureInfo("tr-TR");
		public static string DateTimePattern => "MM.dd.yyyy HH:mm";
		public static string DatePattern => "MM.dd.yyyy";

	}
}
