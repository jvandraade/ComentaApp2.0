using ComentaApp.Application.DTOs.Complaint;

namespace ComentaApp.Application.Interfaces
{
    public interface IComplaintService
    {
        Task<ComplaintDto> CreateComplaintAsync(Guid userId, CreateComplaintDto dto);
        Task<ComplaintDto> GetComplaintByIdAsync(Guid complaintId, Guid? currentUserId = null);
        Task<List<ComplaintDto>> GetComplaintsAsync(Guid? currentUserId = null);
        Task<List<CategoryDto>> GetCategoriesAsync();
    }
}
