using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserImage { get; set; } = null;
        public DateTime RegisterDate { get; set; } = DateTime.UtcNow;
        
        public Country Country { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}