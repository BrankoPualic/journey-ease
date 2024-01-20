using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DestinationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<SeasonDto>> GetSeasonsAsync()
        {
            return await _context.Seasons
                .ProjectTo<SeasonDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}