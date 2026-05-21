import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5126';

  constructor(private http: HttpClient) {}

  getDados() {
    return this.http.get(`${this.baseUrl}/weatherforecast`);
  }
}