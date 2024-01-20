namespace API.DTOs
{
    public class PostDto
    {
        public int PostId { get; set; }
        public string PostTitle { get; set; }
        public string PostContent { get; set; }
        public string PostImageUrl { get; set; }
        public DateTime PostDate { get; set; } = DateTime.UtcNow;
        public string CreatorName { get; set; }
        public CountryDto Country { get; set; }
    }
}