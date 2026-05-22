import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService, Contato } from '../../services/api';

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
  contatos: Contato[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.api.getContatos().subscribe(resultado => {
      this.contatos = resultado;
      this.cdr.detectChanges();
    });
  }

  adicionar() {
    if (this.nome && this.numero) {
      const novoContato: Contato = { nome: this.nome, numero: this.numero };
      this.api.adicionarContato(novoContato).subscribe(contatoSalvo => {
        this.contatos = [...this.contatos, contatoSalvo];
        this.nome = '';
        this.numero = '';
        this.cdr.detectChanges();
      });
    }
  }

  deletar(id: number) {
    this.api.deletarContato(id).subscribe(() => {
      this.contatos = this.contatos.filter(c => c.id !== id);
      this.cdr.detectChanges();
    });
  }
}