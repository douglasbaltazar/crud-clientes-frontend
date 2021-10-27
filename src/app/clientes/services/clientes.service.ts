import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) {

  }

  list() {
    return this.httpClient.get<Cliente[]>(`${this.API}/clientes`)
      .pipe(
        tap(clientes => console.log(clientes))
      );
  }
}
