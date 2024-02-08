using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //  [Authorize(Policy = "RequireAdminRole")]
    public class AdminController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        public AdminController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet("blogStatistics")]
        public async Task<ActionResult<BlogStatistics>> GetBlogStatistics()
        {
            BlogStatistics stats = await _uow.PostRepository.GetBlogStatisticsForAdminPage();

            return Ok(stats);
        }
    }
}