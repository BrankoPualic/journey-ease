using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CountryController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        public CountryController(IUnitOfWork uow)
        {
            _uow = uow;        
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
            IEnumerable<CountryDto> countries = await _uow.CountryRepository.GetCountriesAsync();

            if(countries == null) return NotFound();

            if(!countries.Any()) return Ok(new List<CountryDto>());

            return Ok(countries);
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddCountry(CountryDto countryDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if(countryDto.CountryName == null) return BadRequest(new { message = "Country name can't be null!"});

                _uow.CountryRepository.AddCountry(countryDto.CountryName);

                string adminPanelUri = "/admin/countries-and-places";

                if(await _uow.Complete()) return Created(adminPanelUri ,new { message = "Successfully added country!"});

                return BadRequest(new { message = "Failed to add to database" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}