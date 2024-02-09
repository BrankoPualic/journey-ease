using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPostCommentRepository
    {
        Task<IEnumerable<PostCommentDto>> GetBlogComments(int postId);
        void AddComment(PostComment comment);
        void RemoveComment(PostComment comment);
        void UpdateComment(PostComment comment);
    }
}