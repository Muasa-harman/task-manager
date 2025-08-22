using Microsoft.EntityFrameworkCore;
using TaskApi.Models;

namespace TaskApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskJob> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Store enums as strings in the database (InMemory supports this too)
            modelBuilder.Entity<TaskJob>()
                .Property(t => t.Status)
                .HasConversion<string>();

            modelBuilder.Entity<TaskJob>()
                .Property(t => t.Priority)
                .HasConversion<string>();
        }
    }
}
