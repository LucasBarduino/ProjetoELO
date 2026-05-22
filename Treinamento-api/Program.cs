using Microsoft.EntityFrameworkCore;
using treinamento_api.Data;
using treinamento_api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=contatos.db"));

builder.Services.AddScoped<IContatoService, ContatoService>();
builder.Services.AddControllers();

builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(p =>
        p.WithOrigins("http://localhost:4200")
         .AllowAnyMethod()
         .AllowAnyHeader()));

var app = builder.Build();

app.UseCors();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.Run();