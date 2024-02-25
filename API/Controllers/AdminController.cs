using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     [Authorize(Policy = "RequireAdminRole")]
    public class AdminController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IPhotoService _photoService;
        public AdminController(IUnitOfWork uow, IPhotoService photoService)
        {
            _photoService = photoService;
            _uow = uow;
        }

        [HttpGet("blogStatistics")]
        public async Task<ActionResult<BlogStatistics>> GetBlogStatistics()
        {
            BlogStatistics stats = await _uow.PostRepository.GetBlogStatisticsForAdminPage();

            return Ok(stats);
        }

        [HttpPost("addPost")]
        public async Task<ActionResult<string>> AddPost([FromForm] PostFormData formData)
        {
            try
            {
                var file = formData.Image;

                if(file == null) return BadRequest(new { message = "Something went wrong! Couldn't access image that was sent."});

                var result = await _photoService.AddPhotoAsync(file);

                if(result.Error != null) return BadRequest(new { message = result.Error.Message });

                Post post = new Post
                {
                    PostTitle = formData.PostTitle,
                    PostContent = formData.PostContent,
                    PostImageUrl = result.SecureUrl.AbsoluteUri,
                    PublicId = result.PublicId,
                    CreatorName = formData.CreatorName,
                    PostDescription = formData.PostDescription
                };

                _uow.PostRepository.AddPost(post);

                string adminPanelUri = "/admin/blog";

                if(await _uow.Complete()) return Created(adminPanelUri, new { message = "Successfully addded post." });

                return BadRequest(new { message = "Failed to add to database." });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        
        [HttpPatch("editPost")]
        public async Task<ActionResult<string>> EditPost([FromForm] PostFormData formData)
        {
            try
            {
                var existingPost = await _uow.PostRepository.GetPost(Convert.ToInt16(formData.PostId));

                if(existingPost == null) return NotFound(new { message = "Post not found."});

                existingPost.PostTitle = formData.PostTitle;
                existingPost.PostDescription = formData.PostDescription;
                existingPost.PostContent = formData.PostContent;
                existingPost.CreatorName = formData.CreatorName;

                if(formData.Image != null)
                {
                    var file = formData.Image;

                    if(file == null) return BadRequest( new { message = "Something went wrong! Couldn't access image that was sent." });

                    var result = await _photoService.AddPhotoAsync(file);

                    if(result.Error != null) return BadRequest(new { message = result.Error.Message });

                    var deletion = await _photoService.DeletePhotoAsync(existingPost.PublicId);

                    if(deletion.Error != null) return BadRequest(new { message = deletion.Error.Message });

                    existingPost.PostImageUrl = result.SecureUrl.AbsoluteUri;
                    existingPost.PublicId = result.PublicId;

                }

                _uow.PostRepository.UpdatePost(existingPost);
                
                if(await _uow.Complete()) return Ok(new { message = "Successfully edited post." });

                return BadRequest(new { message = "Failed to edit post." });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    
        [HttpDelete("removePost")]
        public async Task<ActionResult<string>> RemovePost([FromQuery]int postId)
        {
            if(postId <= 0) return BadRequest(new { message = "Post id cannot be 0 or negative."});

            var post = await _uow.PostRepository.GetPost(postId);

            if(post == null) return NotFound(new { message = "Post not found."});

            var result = await _photoService.DeletePhotoAsync(post.PublicId);

            if(result.Error != null) return BadRequest(new { message = result.Error.Message });

            _uow.PostRepository.RemovePost(post); 

            if(await _uow.Complete()) return Ok(new { message = "Post successfully removed"});

            return BadRequest(new { message = "Failed to remove post from database."});
        }
    }
}