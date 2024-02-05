using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<PagedList<PostDto>> GetBlogAsync(PostParams postParams);
        Task<Post> GetPost(int postId);
        Task<IEnumerable<PostDto>> GetSearchedBlog(string searchValue);
        Task<PostDto> GetSelectedPost(int postId);
        void AddPost(Post post);
        void RemovePost(Post post);
        void UpdatePost(Post post);
    }
}