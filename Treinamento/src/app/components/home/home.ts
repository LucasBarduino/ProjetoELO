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
//

adicionar() {
  if (this.nome && this.numero) {
    const limpo = this.numero.replace(/[\s\-()]/g, '');
    
    if (!/^\d{10,13}$/.test(limpo)) {
      alert('Número inválido. Informe tamebém o país e o DDD Ex: 55 31 9 99999999');
      return;
    }

    const novoContato: Contato = { nome: this.nome, numero: limpo };
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