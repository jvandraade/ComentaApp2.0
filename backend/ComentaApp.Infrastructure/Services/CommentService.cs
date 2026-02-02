using ComentaApp.Application.DTOs.Complaint;
using ComentaApp.Application.DTOs.User;
using ComentaApp.Application.Interfaces;
using ComentaApp.Domain.Entities;
using ComentaApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ComentaApp.Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CommentDto> CreateCommentAsync(Guid userId, Guid complaintId, CreateCommentDto dto)
        {
            // Verify complaint exists
            var complaint = await _context.Complaints.FindAsync(complaintId);
            if (complaint == null)
            {
                throw new Exception("Complaint not found");
            }

            var comment = new Comment
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                ComplaintId = complaintId,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            // Return comment with user data
            var user = await _context.Users.FindAsync(userId);

            return new CommentDto
            {
                Id = comment.Id,
                UserId = comment.UserId,
                User = new UserBasicDto
                {
                    Id = user!.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    AvatarUrl = user.AvatarUrl
                },
                ComplaintId = comment.ComplaintId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt
            };
        }

        public async Task<List<CommentDto>> GetCommentsAsync(Guid complaintId)
        {
            var comments = await _context.Comments
                .Include(c => c.User)
                .Where(c => c.ComplaintId == complaintId)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            return comments.Select(c => new CommentDto
            {
                Id = c.Id,
                UserId = c.UserId,
                User = new UserBasicDto
                {
                    Id = c.User.Id,
                    FirstName = c.User.FirstName,
                    LastName = c.User.LastName,
                    AvatarUrl = c.User.AvatarUrl
                },
                ComplaintId = c.ComplaintId,
                Content = c.Content,
                CreatedAt = c.CreatedAt
            }).ToList();
        }

        public async Task<bool> DeleteCommentAsync(Guid userId, Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            if (comment == null)
            {
                throw new Exception("Comment not found");
            }

            // Only allow the comment author to delete
            if (comment.UserId != userId)
            {
                throw new Exception("You can only delete your own comments");
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
