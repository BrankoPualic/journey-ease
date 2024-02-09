using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ICountryRepository CountryRepository => new CountryRepository(_context, _mapper);

        public IDestinationRepository DestinationRepository => new DestinationRepository(_context, _mapper);

        public IPostRepository PostRepository => new PostRepository(_context, _mapper);

        public IFaqRepository FaqRepository => new FaqRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}