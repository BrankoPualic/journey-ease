namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        ICountryRepository CountryRepository {get;}
        Task<bool> Complete();
    }
}