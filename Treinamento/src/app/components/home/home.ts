import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  nome = '';
  telefone = '';
  contatos = signal<{ nome: string; telefone: string }[]>([]);
  dadosApi: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getDados().subscribe((resultado: any) => {
      this.dadosApi = resultado as any[];
      console.log(this.dadosApi);
    });
  }

  adicionar() {
    if (this.nome && this.telefone) {
      this.contatos.update(lista => [...lista, { nome: this.nome, telefone: this.telefone }]);
      this.nome = '';
      this.telefone = '';
    }
  }
}