namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        ICountryRepository CountryRepository {get;}
        IDestinationRepository DestinationRepository {get;}
        IPostRepository PostRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}