using ComentaApp.Application.DTOs.Dashboard;
using ComentaApp.Application.Interfaces;
using ComentaApp.Domain.Entities;
using ComentaApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ComentaApp.Infrastructure.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<StatisticsDto> GetStatisticsAsync()
        {
            var totalComplaints = await _context.Complaints.CountAsync();
            var totalUsers = await _context.Users.CountAsync();

            var complaintsByStatus = await _context.Complaints
                .GroupBy(c => c.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToListAsync();

            var complaintsByCategory = await _context.Complaints
                .Include(c => c.Category)
                .GroupBy(c => new { c.Category.Name, c.Category.Color })
                .Select(g => new CategoryStatDto
                {
                    CategoryName = g.Key.Name,
                    CategoryColor = g.Key.Color,
                    Count = g.Count()
                })
                .OrderByDescending(c => c.Count)
                .ToListAsync();

            var recentComplaints = await _context.Complaints
                .Include(c => c.Category)
                .OrderByDescending(c => c.CreatedAt)
                .Take(10)
                .Select(c => new RecentComplaintDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    CategoryName = c.Category.Name,
                    Status = c.Status.ToString(),
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();

            return new StatisticsDto
            {
                TotalComplaints = totalComplaints,
                TotalUsers = totalUsers,
                PendingComplaints = complaintsByStatus.FirstOrDefault(s => s.Status == ComplaintStatus.Pending)?.Count ?? 0,
                InProgressComplaints = complaintsByStatus.FirstOrDefault(s => s.Status == ComplaintStatus.InProgress)?.Count ?? 0,
                ResolvedComplaints = complaintsByStatus.FirstOrDefault(s => s.Status == ComplaintStatus.Resolved)?.Count ?? 0,
                RejectedComplaints = complaintsByStatus.FirstOrDefault(s => s.Status == ComplaintStatus.Rejected)?.Count ?? 0,
                ComplaintsByCategory = complaintsByCategory,
                RecentComplaints = recentComplaints
            };
        }

        public async Task<bool> UpdateComplaintStatusAsync(Guid complaintId, string status)
        {
            var complaint = await _context.Complaints.FindAsync(complaintId);

            if (complaint == null)
            {
                throw new Exception("Complaint not found");
            }

            if (!Enum.TryParse<ComplaintStatus>(status, out var newStatus))
            {
                throw new Exception("Invalid status");
            }

            complaint.Status = newStatus;
            complaint.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
