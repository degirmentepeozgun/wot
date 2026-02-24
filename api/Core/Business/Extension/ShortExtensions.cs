namespace Core.BusinessTemplates.Extension {
	internal static class ShortExtensions {
		public static bool HasFlag(this short? num, short? flag) {
			if(num == null || flag == null)
				return false;
			return flag == 0 || (num & flag) > 0;
		}
	}
}
