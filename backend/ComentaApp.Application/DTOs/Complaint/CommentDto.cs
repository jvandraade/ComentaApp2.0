using ComentaApp.Application.DTOs.User;

namespace ComentaApp.Application.DTOs.Complaint
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserBasicDto User { get; set; } = null!;
        public Guid ComplaintId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CreateCommentDto
    {
        public string Content { get; set; } = string.Empty;
    }
}
