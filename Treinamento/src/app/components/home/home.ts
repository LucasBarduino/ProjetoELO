import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService, Contato } from '../../services/api';

type ContatoUI = Contato & { editando: boolean; _backup?: Contato };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  nome = '';
  numero = '';
  contatos: ContatoUI[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.api.getContatos().subscribe((resultado) => {
      this.contatos = resultado.map((c) => ({ ...c, editando: false }));
    });
  }

  adicionar() {
    if (this.nome && this.numero) {
      const limpo = this.numero.replace(/[\s\-()]/g, '');
      if (!/^\d{10,13}$/.test(limpo)) {
        alert('Número inválido. Informe também o país e o DDD. Ex: 55 31 9 99999999');
        return;
      }
      const novoContato: Contato = { nome: this.nome, numero: limpo };
      this.api.adicionarContato(novoContato).subscribe((contatoSalvo) => {
        this.contatos = [...this.contatos, { ...contatoSalvo, editando: false }];
        this.nome = '';
        this.numero = '';
      });
    }
  }

  ativarEdicao(contato: ContatoUI) {
    this.contatos = this.contatos.map((c) =>
      c.id === contato.id
        ? { ...c, editando: true, _backup: { id: c.id, nome: c.nome, numero: c.numero } }
        : c,
    );
  }

  salvar(contato: ContatoUI) {
    this.api.editarContato(contato).subscribe((contatoAtualizado) => {
      this.contatos = this.contatos.map((c) =>
        c.id === contatoAtualizado.id ? { ...contatoAtualizado, editando: false } : c,
      );
    });
  }

  cancelar(contato: ContatoUI) {
    this.contatos = this.contatos.map((c) =>
      c.id === contato.id && c._backup ? { ...c._backup, editando: false } : c,
    );
  }

  deletar(id: number) {
    this.api.deletarContato(id).subscribe(() => {
      this.contatos = this.contatos.filter((c) => c.id !== id);
    });
  }
}
