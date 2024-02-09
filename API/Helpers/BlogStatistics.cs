namespace API.Helpers
{
    public class BlogStatistics
    {
        public int TotalBlog { get; set; }
        public int TotalAuthors { get; set; }
        public string TopAuthor { get; set; }
        public int TotalComments { get; set; }

        public BlogStatistics(int blogCount, int authorsCount, string topAuthor, int totalComment)
        {
            TotalBlog = blogCount;
            TotalAuthors = authorsCount;
            TopAuthor = topAuthor;
            TotalComments = totalComment;
        }
    }
}