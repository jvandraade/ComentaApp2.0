namespace ComentaApp.Application.DTOs.Complaint
{
    public class CreateComplaintDto
    {
        public Guid CategoryId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public List<string> MediaUrls { get; set; } = new();
    }
}
