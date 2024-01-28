using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostDto>> GetBlogAsync();
        Task<Post> GetPost(int postId);
        Task<IEnumerable<PostDto>> GetSearchedBlog(string searchValue);
        Task<PostDto> GetSelectedPost(int postId);
        void AddPost(Post post);
        void RemovePost(Post post);
        void UpdatePost(Post post);
    }
}