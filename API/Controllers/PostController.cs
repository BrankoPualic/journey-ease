using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public PostController(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetBlog()
        {
            IEnumerable<PostDto> blog = await _uow.PostRepository.GetBlogAsync();

            if(blog == null) return NotFound();

            return Ok(blog);
        }

        [HttpGet("{postId}")]
        public async Task<ActionResult<PostDto>> GetPickedPost(int postId)
        {
            Post post = await _uow.PostRepository.GetPost(postId);

            if(post == null) return NotFound();

            return Ok(post);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetSearchedBlog([FromQuery] string searchValue)
        {
            if(string.IsNullOrWhiteSpace(searchValue)) return BadRequest(new { message = "Search value cannot be empty"});

            IEnumerable<PostDto> blog = await _uow.PostRepository.GetSearchedBlog(searchValue);

            if(blog == null) return NotFound();

            return Ok(blog);
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddPost(PostDto postDto)
        {
            try{
                if(String.IsNullOrEmpty(postDto.PostTitle)) return BadRequest(new { message = "Post title can't be null or empty!"});

                Post post = _mapper.Map<Post>(postDto);

                _uow.PostRepository.AddPost(post);

                string adminPanelUri = "/admin/blog";

                if(await _uow.Complete()) return Created(adminPanelUri, new { message = "Successfully added post!" });

                return BadRequest(new { message = "Failed to add to databse"} );
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        

        [HttpDelete("{postId}")]
        public async Task<ActionResult> DeletePost(int postId)
        {
            Post post = await _uow.PostRepository.GetPost(postId);

            if(post == null) return NotFound();

            _uow.PostRepository.RemovePost(post);

            if(await _uow.Complete()) return NoContent();

            return BadRequest(new { message = "Failed to delete post"} );
        }

        [HttpPatch]
        public async Task<ActionResult> UpdatePost(PostDto postDto)
        {
            Post post = await _uow.PostRepository.GetPost(postDto.PostId);

            if(post == null) return NotFound();

            _mapper.Map(postDto, post);

            if(await _uow.Complete()) return NoContent();

            return BadRequest(new { message = "Failed to update post"} );
        }
    }
}