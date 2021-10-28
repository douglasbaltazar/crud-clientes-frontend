import { MatDialog } from '@angular/material/dialog';
import { Cliente } from './../model/cliente';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { Observable } from 'rxjs';
import { EditClientesComponent } from '../edit-clientes/edit-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes$: Observable<Cliente[]>;

  displayedColumns = ['nome', 'telefone', "email", "actions"];
  constructor(private clientesService: ClientesService, public dialog: MatDialog) {
    // this.clientesService = new ClientesService();
    this.clientes$ = this.clientesService.list();
  }

  openDialog(data?: Cliente): void {
    const dialogRef = this.dialog.open(EditClientesComponent, {
      data: {nome: data?.nome, telefone: data?.telefone, email: data?.email, id: data?.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      // fechou
      console.log(result);
      if(result && result.id)  {
        this.clientesService.atualizar(result);
        this.ngOnInit();
      } else if(result && !result.id) {
        this.clientesService.cadastrar(result);
        this.ngOnInit();
      }
    });
  }

  public getRecord(row: Cliente){
    this.openDialog(row);
  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.list()
  }

}
