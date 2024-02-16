using API.Entities;

namespace API.Interfaces
{
    public interface INewsletterSubscriptionRepository
    {
        void AddSubscription(string email);
        void UpdateStatus(NewsletterSubscription subscription);
    }
}