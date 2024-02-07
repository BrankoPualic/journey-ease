using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PostRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<PagedList<PostDto>> GetBlogAsync(PostParams postParams)
        {
            var query = _context.Blog
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(p => p.PostDate)
                .AsNoTracking();

            return await PagedList<PostDto>.CreateAsync(query, postParams.PageNumber, postParams.PageSize);
        }

        public async Task<Post> GetPost(int postId)
        {
            return await _context.Blog.FindAsync(postId);
        }
        public void AddPost(Post post)
        {
            _context.Blog.Add(post);
        }


        public void RemovePost(Post post)
        {
            _context.Blog.Remove(post);
        }

        public void UpdatePost(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
        }

        public async Task<PagedList<PostDto>> GetSearchedBlog(string searchValue, PostParams postParams)
        {
            var query = _context.Blog
                .Where(p => p.PostTitle.ToLower().Contains(searchValue.ToLower())
                    || p.CreatorName.ToLower().Contains(searchValue.ToLower()))
                .OrderByDescending(p => p.PostDate)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            return await PagedList<PostDto>.CreateAsync(query, postParams.PageNumber, postParams.PageSize);
        }

        public async Task<PostDto> GetSelectedPost(int postId)
        {
            return await _context.Blog
                .Where(post => post.PostId == postId)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
                
        }
    }
}