namespace API.DTOs
{
    public class UserCommentDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserImage { get; set; }
        public CountryDto Country { get; set; }
        public int CommentCount { get; set; }
    }
}