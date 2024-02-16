using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CountryController : BaseApiController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public CountryController(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;        
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
            IEnumerable<CountryDto> countries = await _uow.CountryRepository.GetCountriesAsync();

            if(countries == null) return NotFound();

            return Ok(countries);
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddCountry(CountryDto countryDto)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(countryDto.CountryName))
                    return BadRequest(new { message = "Country name can't be null!"});

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

        [HttpDelete("{countryId}")]
        public async Task<ActionResult> DeleteCountry(int countryId)
        {
            Country country = await _uow.CountryRepository.GetCountry(countryId);

            if(country == null) return NotFound();

            _uow.CountryRepository.RemoveCountry(country);

            if(await _uow.Complete()) return NoContent();

            return BadRequest(new { message = "Failed to delete country"});
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateCountry(CountryDto countryDto)
        {
            Country country =  await _uow.CountryRepository.GetCountry(countryDto.CountryId);

            if(country == null) return NotFound();

            _mapper.Map(countryDto, country);

            if(await _uow.Complete()) return NoContent();

            return BadRequest(new { message = "Failed to update country"});
        }
    }
}