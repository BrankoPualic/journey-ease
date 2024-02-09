using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PostCommentRepository : IPostCommentRepository
    {
        private readonly DataContext _context;

        public PostCommentRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<PostCommentDto>> GetBlogComments(int postId)
        {
            var commentsQuery = _context.BlogComments
                .Where(p => p.PostId == postId);

            var commentsDto = await commentsQuery
                .Select(pc => new PostCommentDto
                {
                    CommentId = pc.CommentId,
                    Comment = pc.Comment,
                    CommentDate = pc.CommentDate,
                    Edited = pc.Edited,
                    PostId = pc.PostId,
                    User = new UserCommentDto
                    {
                        FirstName = pc.AppUser.FirstName,
                        LastName = pc.AppUser.LastName,
                        UserImage = pc.AppUser.UserImage,
                        Country = pc.AppUser.Country != null
                            ? new CountryDto
                            {

                            CountryId = pc.AppUser.Country.CountryId,
                            CountryName = pc.AppUser.Country.CountryName
                            }
                            : null,
                        CommentCount = pc.AppUser.PostComments.Count()
                    }
                })
                .ToListAsync();

            return commentsDto;
        }
        public void AddComment(PostComment comment)
        {
            _context.BlogComments.Add(comment);
        }

        public void RemoveComment(PostComment content)
        {
            _context.BlogComments.Remove(content);
        }

        public void UpdateComment(PostComment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
        }
    }
}