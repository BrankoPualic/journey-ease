using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //  [Authorize(Policy = "RequireAdminRole")]
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
        public async Task<ActionResult<string>>  AddPost([FromForm] PostFormData formData)
        {
            try
            {
                var file = formData.Image;

                if(file == null) return BadRequest(new { message = "Something went wrong, couldn't access image that was sent."});

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
    }
}