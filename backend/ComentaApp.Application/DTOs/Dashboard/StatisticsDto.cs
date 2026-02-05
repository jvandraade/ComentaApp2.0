namespace ComentaApp.Application.DTOs.Dashboard
{
    public class StatisticsDto
    {
        public int TotalComplaints { get; set; }
        public int TotalUsers { get; set; }
        public int PendingComplaints { get; set; }
        public int InProgressComplaints { get; set; }
        public int ResolvedComplaints { get; set; }
        public int RejectedComplaints { get; set; }
        public List<CategoryStatDto> ComplaintsByCategory { get; set; } = new();
        public List<RecentComplaintDto> RecentComplaints { get; set; } = new();
    }

    public class CategoryStatDto
    {
        public string CategoryName { get; set; } = string.Empty;
        public string CategoryColor { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class RecentComplaintDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
