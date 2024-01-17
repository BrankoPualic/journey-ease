using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CountryRepository : ICountryRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public CountryRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Country> GetCountry(int countryId)
        {
            return await _context.Countries.FindAsync(countryId);
        }
        
        public void AddCountry(string countryName)
        {
            _context.Countries.Add(
                new Country
                {
                    CountryName = countryName
                }
            );
        }

        public async Task<IEnumerable<CountryDto>> GetCountriesAsync()
        {
            return await _context.Countries
                .ProjectTo<CountryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void RemoveCountry(Country country)
        {
            _context.Countries.Remove(country);
        }

        public void UpdateCountry(Country country)
        {
            _context.Entry(country).State = EntityState.Modified;
        }
    }
}