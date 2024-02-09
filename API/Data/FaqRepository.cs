using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FaqRepository : IFaqRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FaqRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<FaqDto>> GetFaqsAsync()
        {
            return await _context.Faqs
                .ProjectTo<FaqDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}