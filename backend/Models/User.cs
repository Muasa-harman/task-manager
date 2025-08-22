namespace TaskApi.Models
{
    public enum UserRole
    {
        USER,
        ADMIN
    }
    
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        // public string Role { get; set; } = UserRole.ADMIN.ToString();
        public string Role { get; set; } = UserRole.USER.ToString();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
