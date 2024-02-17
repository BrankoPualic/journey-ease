using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class NewsletterSubscriptionController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public NewsletterSubscriptionController(IUnitOfWork uow, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _uow = uow;    
        }


        [HttpPost]
        public async Task<ActionResult<string>> AddSubscription(NewsletterSubscriptionDto nsDto)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(nsDto.Email))
                    return BadRequest(new { message = "Email is invalid."});

                if(await _context.NewsletterSubscriptions.AnyAsync(e => e.Email == nsDto.Email))
                    return BadRequest(new { message = "Email is already subscribed." });
                

                _uow.NewsletterSubscriptionRepository.AddSubscription(nsDto.Email);

                string uri = "https://localhost:4200/api/newsletterSubscription";

                if(await _uow.Complete())
                    return Created(uri, new { message = "Successfully subscribed."});

                return BadRequest(new { message = "Failed to add to database" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}