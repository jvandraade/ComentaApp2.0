using ComentaApp.Application.DTOs.User;

namespace ComentaApp.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserProfileDto> GetProfileAsync(Guid userId);
        Task<UserProfileDto> UpdateProfileAsync(Guid userId, UpdateProfileDto dto);
        Task<string> UpdateAvatarAsync(Guid userId, string avatarUrl);
    }
}
