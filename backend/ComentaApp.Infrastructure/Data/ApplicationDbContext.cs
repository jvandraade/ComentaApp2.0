using ComentaApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ComentaApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<ComplaintMedia> ComplaintMedia { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasIndex(e => e.Email)
                    .IsUnique();

                entity.Property(e => e.PasswordHash)
                    .IsRequired();

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(2);
            });

            // Category configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.IconName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasMaxLength(7);
            });

            // Complaint configuration
            modelBuilder.Entity<Complaint>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Latitude)
                    .HasPrecision(10, 7);

                entity.Property(e => e.Longitude)
                    .HasPrecision(10, 7);

                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Category)
                    .WithMany(c => c.Complaints)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // ComplaintMedia configuration
            modelBuilder.Entity<ComplaintMedia>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.MediaUrl)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(e => e.Complaint)
                    .WithMany(c => c.Media)
                    .HasForeignKey(e => e.ComplaintId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Like configuration
            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Complaint)
                    .WithMany(c => c.Likes)
                    .HasForeignKey(e => e.ComplaintId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Unique constraint: one like per user per complaint
                entity.HasIndex(e => new { e.UserId, e.ComplaintId })
                    .IsUnique();
            });

            // Comment configuration
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Complaint)
                    .WithMany(c => c.Comments)
                    .HasForeignKey(e => e.ComplaintId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
