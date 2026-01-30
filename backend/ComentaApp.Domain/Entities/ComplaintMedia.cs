namespace ComentaApp.Domain.Entities
{
    public class ComplaintMedia
    {
        public Guid Id { get; set; }
        public Guid ComplaintId { get; set; }
        public string MediaUrl { get; set; } = string.Empty;
        public MediaType MediaType { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public Complaint Complaint { get; set; } = null!;
    }

    public enum MediaType
    {
        Image = 0,
        Video = 1
    }
}
