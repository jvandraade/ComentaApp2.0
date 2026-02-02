using ComentaApp.Application.Interfaces;
using ComentaApp.Domain.Entities;
using ComentaApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ComentaApp.Infrastructure.Services
{
    public class LikeService : ILikeService
    {
        private readonly ApplicationDbContext _context;

        public LikeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ToggleLikeAsync(Guid userId, Guid complaintId)
        {
            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.UserId == userId && l.ComplaintId == complaintId);

            if (existingLike != null)
            {
                // Remove like
                _context.Likes.Remove(existingLike);
                await _context.SaveChangesAsync();
                return false; // Returns false = unliked
            }

            // Add like
            var like = new Like
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                ComplaintId = complaintId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return true; // Returns true = liked
        }

        public async Task<bool> IsLikedAsync(Guid userId, Guid complaintId)
        {
            return await _context.Likes
                .AnyAsync(l => l.UserId == userId && l.ComplaintId == complaintId);
        }

        public async Task<int> GetLikesCountAsync(Guid complaintId)
        {
            return await _context.Likes
                .CountAsync(l => l.ComplaintId == complaintId);
        }
    }
}
