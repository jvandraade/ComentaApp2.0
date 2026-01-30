using ComentaApp.Domain.Entities;

namespace ComentaApp.Infrastructure.Data
{
    public static class DbSeeder
    {
        public static async Task SeedCategoriesAsync(ApplicationDbContext context)
        {
            if (context.Categories.Any())
            {
                return; // Already seeded
            }

            var categories = new List<Category>
            {
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Buraco na via",
                    IconName = "construction",
                    Color = "#EF4444",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Iluminação pública",
                    IconName = "lightbulb",
                    Color = "#F59E0B",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Lixo e limpeza",
                    IconName = "trash-2",
                    Color = "#10B981",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Saneamento",
                    IconName = "droplet",
                    Color = "#3B82F6",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Transporte público",
                    IconName = "bus",
                    Color = "#8B5CF6",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Segurança",
                    IconName = "shield",
                    Color = "#EC4899",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    Name = "Outros",
                    IconName = "alert-circle",
                    Color = "#6B7280",
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }
    }
}
