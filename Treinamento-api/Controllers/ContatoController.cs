using Microsoft.AspNetCore.Mvc;
using treinamento_api.Models;
using treinamento_api.Services;

namespace treinamento_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContatoController : ControllerBase
{
    private readonly IContatoService _service;

    public ContatoController(IContatoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetTodos()
        => Ok(await _service.GetTodosAsync());

    [HttpPost]
    public async Task<IActionResult> Adicionar(Contato contato)
        => Ok(await _service.AdicionarAsync(contato));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(int id)
    {
        await _service.DeletarAsync(id);
        return NoContent();
    }
}