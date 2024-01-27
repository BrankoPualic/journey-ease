using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Blog")]
    public class Post
    {
        public int PostId { get; set; }
        public string PostTitle { get; set; }
        public string PostContent { get; set; }
        public string PostImageUrl { get; set; }
        public DateTime PostDate { get; set; } = DateTime.UtcNow;
        public string CreatorName { get; set; }
        public string PostDescription { get; set; }
    }
}