using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostCommentController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        public PostCommentController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostCommentDto>>> GetPostComments([FromQuery]int postId)
        {
            IEnumerable<PostCommentDto> comments = await _uow.PostCommentRepository.GetBlogComments(postId);

            if(comments == null) return NotFound();

            return Ok(comments);
        }

    }
}