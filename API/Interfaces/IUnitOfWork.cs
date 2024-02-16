namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        ICountryRepository CountryRepository { get; }
        IDestinationRepository DestinationRepository { get; }
        IPostRepository PostRepository { get; }
        IFaqRepository FaqRepository { get; }
        IPostCommentRepository PostCommentRepository { get; }
        INewsletterSubscriptionRepository NewsletterSubscriptionRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}