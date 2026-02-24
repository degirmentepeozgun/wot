using System.Linq.Expressions;

namespace Core.BusinessTemplates.Extension {
	internal static class QueryableExtensions {
        public static IQueryable<TSource> OrderByWithColumnName<TSource>(this IQueryable<TSource> source, 
            string propertyName, string? direction = null) {
            var param = Expression.Parameter(typeof(TSource), "x");
            Expression property = Expression.Property(param, propertyName);
            var lambda = Expression.Lambda(property, param);
            direction = direction?.ToLower() ?? "asc";
            string methodName = (direction == "desc" || direction == "descending") ? "OrderByDescending" : "OrderBy";
            var orderByMethod = typeof(Queryable).GetMethods().First(x => x.Name == 
            methodName && x.GetParameters().Length == 2);
            var orderByGeneric = orderByMethod.MakeGenericMethod(typeof(TSource), property.Type);
            var result = orderByGeneric.Invoke(null, new object[] { source, lambda });
			if(result == null)
				return source;
			return (IQueryable<TSource>)result;
        }
    }
}
