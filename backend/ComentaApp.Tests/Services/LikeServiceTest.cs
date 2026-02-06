using ComentaApp.Domain.Entities;
using ComentaApp.Infrastructure.Services;
using FluentAssertions;
using Xunit;

namespace ComentaApp.Tests.Services
{
    public class LikeServiceTests : TestBase
    {
        [Fact]
        public async Task ToggleLikeAsync_ShouldAddLike_WhenLikeDoesNotExist()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new LikeService(context);

            var userId = Guid.NewGuid();
            var complaintId = Guid.NewGuid();

            // Act
            var result = await service.ToggleLikeAsync(userId, complaintId);

            // Assert
            result.Should().BeTrue(); // Liked
            var likesCount = await service.GetLikesCountAsync(complaintId);
            likesCount.Should().Be(1);
        }

        [Fact]
        public async Task ToggleLikeAsync_ShouldRemoveLike_WhenLikeExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new LikeService(context);

            var userId = Guid.NewGuid();
            var complaintId = Guid.NewGuid();

            var like = new Like
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                ComplaintId = complaintId,
                CreatedAt = DateTime.UtcNow
            };

            context.Likes.Add(like);
            await context.SaveChangesAsync();

            // Act
            var result = await service.ToggleLikeAsync(userId, complaintId);

            // Assert
            result.Should().BeFalse(); // Unliked
            var likesCount = await service.GetLikesCountAsync(complaintId);
            likesCount.Should().Be(0);
        }
    }
}
