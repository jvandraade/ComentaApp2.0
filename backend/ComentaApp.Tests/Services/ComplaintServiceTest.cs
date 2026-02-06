using ComentaApp.Application.DTOs.Complaint;
using ComentaApp.Domain.Entities;
using ComentaApp.Infrastructure.Services;
using FluentAssertions;
using Xunit;

namespace ComentaApp.Tests.Services
{
    public class ComplaintServiceTests : TestBase
    {
        [Fact]
        public async Task CreateComplaintAsync_ShouldCreateComplaint_WhenDataIsValid()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new ComplaintService(context);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = "test@test.com",
                PasswordHash = "hash",
                FirstName = "Test",
                LastName = "User",
                City = "Test City",
                State = "TS",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = "Test Category",
                IconName = "test",
                Color = "#FF0000",
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(user);
            context.Categories.Add(category);
            await context.SaveChangesAsync();

            var dto = new CreateComplaintDto
            {
                CategoryId = category.Id,
                Title = "Test Complaint",
                Description = "Test Description",
                Address = "Test Address",
                MediaUrls = new List<string>()
            };

            // Act
            var result = await service.CreateComplaintAsync(user.Id, dto);

            // Assert
            result.Should().NotBeNull();
            result.Title.Should().Be("Test Complaint");
            result.Description.Should().Be("Test Description");
            result.Status.Should().Be("Pending");
        }

        [Fact]
        public async Task GetComplaintsAsync_ShouldReturnComplaints_WhenComplaintsExist()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new ComplaintService(context);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = "test@test.com",
                PasswordHash = "hash",
                FirstName = "Test",
                LastName = "User",
                City = "Test City",
                State = "TS",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = "Test Category",
                IconName = "test",
                Color = "#FF0000",
                CreatedAt = DateTime.UtcNow
            };

            var complaint = new Complaint
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                CategoryId = category.Id,
                Title = "Test",
                Description = "Test",
                Address = "Test",
                Status = ComplaintStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Users.Add(user);
            context.Categories.Add(category);
            context.Complaints.Add(complaint);
            await context.SaveChangesAsync();

            // Act
            var result = await service.GetComplaintsAsync();

            // Assert
            result.Should().NotBeEmpty();
            result.Should().HaveCount(1);
            result[0].Title.Should().Be("Test");
        }
    }
}
