namespace ComentaApp.Domain.Entities
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string IconName { get; set; } = string.Empty;
        public string Color { get; set; } = "#00D9FF"; // Default primary color
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
    }
}
