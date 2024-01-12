using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public DestinationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CountryDto>> GetCountriesAsync()
        {
            return await _context.Countries
                .ProjectTo<CountryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}