using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BlogComments")]
    public class PostComment
    {
        public int CommentId { get; set; }
        public string Comment { get; set; }
        public DateTime CommentDate { get; set; } = DateTime.UtcNow;
        public bool Edited { get; set; } = false;
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int UserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}