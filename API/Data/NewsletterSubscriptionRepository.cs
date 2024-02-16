using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NewsletterSubscriptionRepository : INewsletterSubscriptionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NewsletterSubscriptionRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddSubscription(string email)
        {
            _context.NewsletterSubscriptions.Add(
                new NewsletterSubscription
                {
                    Email = email,
                    Status = true
                }
            );
        }

        public void UpdateStatus(NewsletterSubscription subscription)
        {
            _context.Entry(subscription).State = EntityState.Modified;
        }
    }
}