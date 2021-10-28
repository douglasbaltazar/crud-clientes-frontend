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
      data: {data}
    });

    dialogRef.afterClosed().subscribe(result => {
      // fechou
      if(result) {
        console.log(result);
        this.clientesService.cadastrar(result);
      }
    });
  }

  public getRecord(row: Cliente){
    console.log(row);
    this.openDialog(row);
  }

  ngOnInit(): void {
  }

}
