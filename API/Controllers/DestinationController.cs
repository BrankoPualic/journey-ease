using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DestinationController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        public DestinationController(IUnitOfWork uow)
        {
            _uow = uow;        
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
            IEnumerable<CountryDto> countries = await _uow.DestinationRepository.GetCountriesAsync();

            if(countries == null) return NotFound();

            if(!countries.Any()) return Ok(new List<CountryDto>());

            return Ok(countries);
        }
    }
}