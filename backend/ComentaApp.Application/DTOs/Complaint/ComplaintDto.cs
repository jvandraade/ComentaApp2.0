using ComentaApp.Application.DTOs.User;

namespace ComentaApp.Application.DTOs.Complaint
{
    public class ComplaintDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserBasicDto User { get; set; } = null!;
        public Guid CategoryId { get; set; }
        public CategoryDto Category { get; set; } = null!;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public List<ComplaintMediaDto> Media { get; set; } = new();
        public int LikesCount { get; set; }
        public int CommentsCount { get; set; }
        public bool IsLikedByCurrentUser { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ComplaintMediaDto
    {
        public Guid Id { get; set; }
        public string MediaUrl { get; set; } = string.Empty;
        public string MediaType { get; set; } = string.Empty;
    }

    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string IconName { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
