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
  clientes$: Cliente[];
  displayedColumns = ['nome', 'telefone', 'email', 'actions'];
  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {  }

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
      this.refresh();
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
        this.refresh();
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
    this.clientesService.list().subscribe((res) => {
      this.clientes$ = res;
      this.changeDetectorRefs.detectChanges();
    });
  }

  public delete(row: Cliente) {
    this.openDialogConfirm(row);
  }


}
