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

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(int id, Contato contato)
    {
        contato.Id = id; // garante que o ID do body bate com o da URL
        var contatoAtualizado = await _service.EditarAsync(contato);
        return Ok(contatoAtualizado);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(int id)
    {
        await _service.DeletarAsync(id);
        return NoContent();
    }


}