using System.Text.RegularExpressions;

namespace Core.BusinessTemplates.Extension {
	public static class StringExtensions {
		static readonly Regex trim = new(@"^\s+|\s+$|\s+(?=\s)", RegexOptions.Compiled);
		public static string TrimAll(this string value) {
			return trim.Replace(value, string.Empty);
		}
	}
}
