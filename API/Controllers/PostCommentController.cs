using API.DTOs;
using API.Entities;
using API.Helpers;
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
        public async Task<ActionResult<IEnumerable<PostCommentDto>>> GetPostComments([FromQuery]int postId, [FromQuery]PostParams postParams)
        {
            IEnumerable<PostCommentDto> comments = await _uow.PostCommentRepository.GetBlogComments(postId, postParams);

            if(comments == null) return NotFound();

            return Ok(comments);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveComment([FromQuery] int commentId)
        {
            PostComment comment = await _uow.PostCommentRepository.GetComment(commentId);

            if(comment == null) return NotFound();

            _uow.PostCommentRepository.RemoveComment(comment);

            if(await _uow.Complete()) return NoContent();

            return BadRequest(new {message = "Failed to delete comment"});
        }

    }
}