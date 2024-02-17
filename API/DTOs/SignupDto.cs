using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class SignupDto
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        [Required] public string Email { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")]
        public string Password { get; set; }
        [Required] public string ConfirmPassword { get; set; }
        [Required] public int CountryId { get; set; }
        public bool Newsletter { get; set; }
    }
}