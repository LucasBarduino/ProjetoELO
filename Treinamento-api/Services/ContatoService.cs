using Microsoft.EntityFrameworkCore;
using treinamento_api.Data;
using treinamento_api.Models;

namespace treinamento_api.Services;

public class ContatoService : IContatoService
{
    private readonly AppDbContext _context;

    public ContatoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Contato>> GetTodosAsync()
        => await _context.Contatos.ToListAsync();

    public async Task<Contato> AdicionarAsync(Contato contato)
    {
        _context.Contatos.Add(contato);
        await _context.SaveChangesAsync();
        return contato;
    }

    public async Task<Contato> EditarAsync(Contato contato)
    {
        _context.Contatos.Update(contato);
        await _context.SaveChangesAsync();
        return contato;
    }

    public async Task DeletarAsync(int id)
    {
        var contato = await _context.Contatos.FindAsync(id);
        if (contato != null)
        {
            _context.Contatos.Remove(contato);
            await _context.SaveChangesAsync();
        }
    }
}