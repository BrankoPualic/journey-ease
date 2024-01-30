namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        ICountryRepository CountryRepository {get;}
        IDestinationRepository DestinationRepository {get;}
        IPostRepository PostRepository {get;}
        IPostCommentRepository PostCommentRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}