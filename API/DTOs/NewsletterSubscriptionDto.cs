namespace API.DTOs
{
    public class NewsletterSubscriptionDto
    {
        public int SubscriberId { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public DateTime StatusChangedDate { get; set; } = DateTime.UtcNow;
    }
}