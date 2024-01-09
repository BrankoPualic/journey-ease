using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Roles")]
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}