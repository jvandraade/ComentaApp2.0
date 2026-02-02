using ComentaApp.Application.DTOs.Complaint;

namespace ComentaApp.Application.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDto> CreateCommentAsync(Guid userId, Guid complaintId, CreateCommentDto dto);
        Task<List<CommentDto>> GetCommentsAsync(Guid complaintId);
        Task<bool> DeleteCommentAsync(Guid userId, Guid commentId);
    }
}
