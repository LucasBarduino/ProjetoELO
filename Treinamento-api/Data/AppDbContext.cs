using Microsoft.EntityFrameworkCore;
using treinamento_api.Models;

namespace treinamento_api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Contato> Contatos { get; set; }
}