using API.Helpers;

namespace API.Extensions
{
    public static class PagedListExtension<T>
    {
        public static async Task<PagedList<T>> ApplyCommonFilters(IQueryable<T> query, PostParams postParams, string column)
        {
            if(!string.IsNullOrWhiteSpace(postParams.Column) && !string.IsNullOrWhiteSpace(postParams.Direction))
                return await PagedList<T>.CreateAsyncWithOrdering(query, postParams.PageNumber, postParams.PageSize, postParams.Column, postParams.Direction);
            else
                return await PagedList<T>.CreateAsyncWithOrdering(query, postParams.PageNumber, postParams.PageSize, column, "Descending");
        }
    }
}