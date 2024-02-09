namespace API.DTOs
{
    public class PostCommentDto
    {
        public int CommentId { get; set; }
        public string Comment { get; set; }
        public DateTime CommentDate { get; set; }
        public bool Edited { get; set; }
        public int PostId { get; set; }
        public UserCommentDto User { get; set; }
    }
}