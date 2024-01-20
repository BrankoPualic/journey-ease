using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DestinationController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public DestinationController(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }

        [HttpGet("seasons")]
        public async Task<ActionResult<IEnumerable<SeasonDto>>> GetSeasons()
        {
            IEnumerable<SeasonDto> seasons = await _uow.DestinationRepository.GetSeasonsAsync();

            if(seasons == null) return NotFound();

            return Ok(seasons);
        }
    }
}