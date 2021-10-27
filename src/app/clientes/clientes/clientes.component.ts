import { Cliente } from './../model/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [
    {
      nome: "Douglas",
      telefone: "84 998199161",
      email: "douglasbaltazar1@gmail.com"
    }
  ];
  displayedColumns = ['nome', 'telefone', "email"];
  constructor() { }

  ngOnInit(): void {
  }

}
