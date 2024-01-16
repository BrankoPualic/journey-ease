using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CountryDto
    {
        public int CountryId { get; set; }
        [Required]
        public string CountryName { get; set; }
    }
}