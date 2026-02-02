namespace ComentaApp.Application.DTOs.Complaint
{
    public class LikeDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ComplaintId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
