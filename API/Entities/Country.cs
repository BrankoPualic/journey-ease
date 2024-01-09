using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Countries")]
    public class Country
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
    }
}