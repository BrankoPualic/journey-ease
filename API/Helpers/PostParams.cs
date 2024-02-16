#nullable enable
namespace API.Helpers
{
    public class PostParams
    {
        private const int MaxPageSize = 25;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 5;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string? Column { get; set; } = null;
        public string? Direction { get; set; } = "ascending";
    }
}