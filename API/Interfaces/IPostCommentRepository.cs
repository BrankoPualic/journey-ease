using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPostCommentRepository
    {
        Task<IEnumerable<PostCommentDto>> GetBlogComments(int postId, PostParams postParams);
        Task<PostComment> GetComment(int commentId);
        void AddComment(PostComment comment);
        void RemoveComment(PostComment comment);
        void UpdateComment(PostComment comment);
    }
}