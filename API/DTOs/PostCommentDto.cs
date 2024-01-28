namespace API.DTOs
{
    public class PostCommentDto
    {
        public int CommentId { get; set; }
        public string Comment { get; set; }
        public DateTime CommentDate { get; set; }
        public PostDto Post { get; set; }
        public UserCommentDto User { get; set; }
    }
}