using treinamento_api.Models;

namespace treinamento_api.Services;

public interface IContatoService
{
    Task<List<Contato>> GetTodosAsync();
    Task<Contato> AdicionarAsync(Contato contato);
    Task DeletarAsync(int id);
}