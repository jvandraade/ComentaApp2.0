using ComentaApp.Application.DTOs.Dashboard;

namespace ComentaApp.Application.Interfaces
{
    public interface IDashboardService
    {
        Task<StatisticsDto> GetStatisticsAsync();
        Task<bool> UpdateComplaintStatusAsync(Guid complaintId, string status);
    }
}
