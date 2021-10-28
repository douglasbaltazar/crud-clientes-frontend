import { DialogRemoverComponent } from './../dialog-remover/dialog-remover.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from './../model/cliente';
import {MatPaginator} from '@angular/material/paginator';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditClientesComponent } from '../edit-clientes/edit-clientes.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  update=new BehaviorSubject<boolean>(false);
  displayedColumns = ['nome', 'telefone', 'email', 'actions'];
  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    // this.clientesService = new ClientesService();
    // this.clientes$ = this.clientesService.list();
    this.refresh();
  }

  openDialog(data?: Cliente): void {
    const dialogRef = this.dialog.open(EditClientesComponent, {
      data: {
        nome: data?.nome,
        telefone: data?.telefone,
        email: data?.email,
        id: data?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.clientesService.atualizar(result);
        this.refresh();
        this.openSnackBar(`Cliente ${result.nome} atualizado com sucesso!`)
      } else if (result && !result.id) {
        this.clientesService.cadastrar(result);
        this.refresh();
        this.openSnackBar(`Cliente ${result.nome} cadastrado com sucesso!`)
      }
    });
  }

  openDialogConfirm(data?: Cliente): void {
    const dialogRef = this.dialog.open(DialogRemoverComponent, {
      data: {
        nome: data?.nome,
        telefone: data?.telefone,
        email: data?.email,
        id: data?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.clientesService.remover(result);
        this.refresh();
        this.openSnackBar(`Cliente ${result.nome} removido com sucesso!`)
      }
    });
  }

  public getRecord(row: Cliente) {
    this.openDialog(row);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.update.subscribe(update=>update === true ? this.refresh() : '');
    this.clientes$ = this.clientesService.list();
  }

  public delete(row: Cliente) {
    this.openDialogConfirm(row);
  }

  openSnackBar(mensagem: string) {
    this._snackBar.open(`${mensagem}`, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  // dataSource = new MatTableDataSource<Cliente>();

  // refresh() {
  // this.clientesService.list().subscribe((data: Cliente[]) => {
  //   this.dataSource.data = data;
  //   }
  // }
}
