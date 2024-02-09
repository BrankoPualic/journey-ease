using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("FAQs")]
    public class Faq
    {
        public int FaqId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}