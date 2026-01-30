using ComentaApp.Application.DTOs.Complaint;
using ComentaApp.Application.DTOs.User;
using ComentaApp.Application.Interfaces;
using ComentaApp.Domain.Entities;
using ComentaApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ComentaApp.Infrastructure.Services
{
    public class ComplaintService : IComplaintService
    {
        private readonly ApplicationDbContext _context;

        public ComplaintService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ComplaintDto> CreateComplaintAsync(Guid userId, CreateComplaintDto dto)
        {
            var complaint = new Complaint
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                CategoryId = dto.CategoryId,
                Title = dto.Title,
                Description = dto.Description,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Address = dto.Address,
                Status = ComplaintStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Complaints.Add(complaint);

            // Add media
            foreach (var mediaUrl in dto.MediaUrls)
            {
                var media = new ComplaintMedia
                {
                    Id = Guid.NewGuid(),
                    ComplaintId = complaint.Id,
                    MediaUrl = mediaUrl,
                    MediaType = DetermineMediaType(mediaUrl),
                    CreatedAt = DateTime.UtcNow
                };
                _context.ComplaintMedia.Add(media);
            }

            await _context.SaveChangesAsync();

            return await GetComplaintByIdAsync(complaint.Id, userId);
        }

        public async Task<ComplaintDto> GetComplaintByIdAsync(Guid complaintId, Guid? currentUserId = null)
        {
            var complaint = await _context.Complaints
                .Include(c => c.User)
                .Include(c => c.Category)
                .Include(c => c.Media)
                .Include(c => c.Likes)
                .Include(c => c.Comments)
                .FirstOrDefaultAsync(c => c.Id == complaintId);

            if (complaint == null)
            {
                throw new Exception("Complaint not found");
            }

            return MapToDto(complaint, currentUserId);
        }

        public async Task<List<ComplaintDto>> GetComplaintsAsync(Guid? currentUserId = null)
        {
            var complaints = await _context.Complaints
                .Include(c => c.User)
                .Include(c => c.Category)
                .Include(c => c.Media)
                .Include(c => c.Likes)
                .Include(c => c.Comments)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return complaints.Select(c => MapToDto(c, currentUserId)).ToList();
        }

        public async Task<List<CategoryDto>> GetCategoriesAsync()
        {
            var categories = await _context.Categories
                .OrderBy(c => c.Name)
                .ToListAsync();

            return categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                IconName = c.IconName,
                Color = c.Color
            }).ToList();
        }

        private ComplaintDto MapToDto(Complaint complaint, Guid? currentUserId)
        {
            return new ComplaintDto
            {
                Id = complaint.Id,
                UserId = complaint.UserId,
                User = new UserBasicDto
                {
                    Id = complaint.User.Id,
                    FirstName = complaint.User.FirstName,
                    LastName = complaint.User.LastName,
                    AvatarUrl = complaint.User.AvatarUrl
                },
                CategoryId = complaint.CategoryId,
                Category = new CategoryDto
                {
                    Id = complaint.Category.Id,
                    Name = complaint.Category.Name,
                    IconName = complaint.Category.IconName,
                    Color = complaint.Category.Color
                },
                Title = complaint.Title,
                Description = complaint.Description,
                Latitude = complaint.Latitude,
                Longitude = complaint.Longitude,
                Address = complaint.Address,
                Status = complaint.Status.ToString(),
                Media = complaint.Media.Select(m => new ComplaintMediaDto
                {
                    Id = m.Id,
                    MediaUrl = m.MediaUrl,
                    MediaType = m.MediaType.ToString()
                }).ToList(),
                LikesCount = complaint.Likes.Count,
                CommentsCount = complaint.Comments.Count,
                IsLikedByCurrentUser = currentUserId.HasValue &&
                    complaint.Likes.Any(l => l.UserId == currentUserId.Value),
                CreatedAt = complaint.CreatedAt
            };
        }

        private MediaType DetermineMediaType(string url)
        {
            var extension = Path.GetExtension(url).ToLower();
            var videoExtensions = new[] { ".mp4", ".mov", ".avi", ".webm" };
            return videoExtensions.Contains(extension) ? MediaType.Video : MediaType.Image;
        }
    }
}
