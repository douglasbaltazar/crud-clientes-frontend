import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Cliente[]>(`${this.API}/clientes`)
      .pipe(tap((clientes) => clientes));
  }

  cadastrar(data: Cliente) {
    return this.httpClient
      .post<Cliente>(`${this.API}/clientes`, data)
      .subscribe((result) => {});
  }
  atualizar(data: Cliente) {
    return this.httpClient
      .put<Cliente>(`${this.API}/clientes/${data.id}`, data)
      .subscribe((result) => {});
  }

  remover(data: Cliente) {
    return this.httpClient
      .delete<Cliente>(`${this.API}/clientes/${data.id}`)
      .subscribe((result) => {});
  }
}
