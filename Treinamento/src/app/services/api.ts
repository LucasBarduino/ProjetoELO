import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Contato {
  id?: number;
  nome: string;
  numero: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5126/api/contato';

  constructor(private http: HttpClient) {}

  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.baseUrl);
  }

  adicionarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.baseUrl, contato);
  }

  deletarContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}