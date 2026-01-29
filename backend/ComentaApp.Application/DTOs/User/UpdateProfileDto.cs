namespace ComentaApp.Application.DTOs.User
{
    public class UpdateProfileDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
    }
}
