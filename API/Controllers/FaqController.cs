using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FaqController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        public FaqController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FaqDto>>> GetFaqs()
        {
            IEnumerable<FaqDto> faqs = await _uow.FaqRepository.GetFaqsAsync();

            if(faqs == null) return NotFound();

            return Ok(faqs);
        }
    }
}