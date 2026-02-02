namespace ComentaApp.Application.Interfaces
{
    public interface ILikeService
    {
        Task<bool> ToggleLikeAsync(Guid userId, Guid complaintId);
        Task<bool> IsLikedAsync(Guid userId, Guid complaintId);
        Task<int> GetLikesCountAsync(Guid complaintId);
    }
}
