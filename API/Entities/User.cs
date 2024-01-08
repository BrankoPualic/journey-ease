namespace API.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserEmail { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string UserPhone { get; set; } = null;
        public string UserImage { get; set; } = null;
        public DateTime RegisterDate { get; set; } = DateTime.UtcNow;
        
        public int CountryId { get; set; }
        public Country Country { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}