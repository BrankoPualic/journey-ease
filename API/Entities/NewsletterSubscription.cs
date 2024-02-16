using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("NewsletterSubscriptions")]
    public class NewsletterSubscription
    {
        public int SubscriberId { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public DateTime StatusChangedDate { get; set; } = DateTime.UtcNow;
    }
}