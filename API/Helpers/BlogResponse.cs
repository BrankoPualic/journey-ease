using API.DTOs;

namespace API.Helpers
{
    public class BlogResponse
    {
        public int TotalPages { get; set; }
        public IEnumerable<PostDto> Blog { get; set; }
    }
}