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
        public async Task<BlogResponse> GetBlogAsync(int page, int pageSize)
        {
            int totalPosts = await _context.Blog.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalPosts / pageSize);

            List<PostDto> blog = await _context.Blog
                .OrderByDescending(b => b.PostDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            
            return new BlogResponse
            {
                TotalPages = totalPages,
                Blog = blog
            };

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

        public async Task<IEnumerable<PostDto>> GetSearchedBlog(string searchValue)
        {
            return await _context.Blog
                .Where(blog => blog.PostTitle.ToLower().Contains(searchValue.ToLower()) 
                    || blog.CreatorName.ToLower().Contains(searchValue.ToLower()))
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
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