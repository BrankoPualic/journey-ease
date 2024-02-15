namespace API.Helpers
{
    public class PostFormData
    {
        public string PostTitle { get; set; }
        public string PostContent { get; set; }
        public string PostDescription { get; set; }
        public string CreatorName { get; set; }
        public IFormFile Image { get; set; }
    }
}