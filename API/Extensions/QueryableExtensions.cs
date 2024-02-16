using System.Linq.Expressions;

namespace API.Extensions
{
    public static class QueryableExtensions
    {
        public static IOrderedQueryable<T> OrderByProperty<T>(this IQueryable<T> source, string propertyName, string direction)
        {
            if(string.IsNullOrWhiteSpace(propertyName))
                throw new ArgumentException("Property name must not be empty", nameof(propertyName));
            
            var methodName = direction == "ascending" ? "OrderBy" : "OrderByDescending";
            var type = typeof(T);
            var property = type.GetProperty(propertyName);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call
            (
                typeof(Queryable),
                methodName,
                [type, property.PropertyType],
                source.Expression,
                Expression.Quote(orderByExpression)
            );

            return (IOrderedQueryable<T>)source.Provider.CreateQuery<T>(resultExpression);
        }
    }
}