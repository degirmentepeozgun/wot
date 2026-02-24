namespace Core.BusinessTemplates.Extension {
	internal static class ListExtensions {
        public static IList<T>? GetDiffs<T>(this IList<T> source, IList<T>? target) {
            if(target == null || source == null)
                return target ?? source;
            List<T>? result = new();
            foreach(var item in source) {
                if(item == null)
                    continue;
                foreach(var subItem in target)
                    if(subItem != null && !item.Equals(subItem))
                        result.Add(subItem);
            }
            return result ?? source;
        }
    }
}
