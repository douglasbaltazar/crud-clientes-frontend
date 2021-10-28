import { Cliente } from './../model/cliente';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ClientesService } from '../services/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-remover',
  templateUrl: './dialog-remover.component.html',
  styleUrls: ['./dialog-remover.component.scss'],
})
export class DialogRemoverComponent implements OnInit {
  message: string = 'Deseja realmente deletar?';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogRemoverComponent>,
    private clienteService: ClientesService,
    private _snackBar: MatSnackBar
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.message = `Deseja realmente excluir o Cliente: ${data.nome}?`;
    }
  }

  ngOnInit(): void {}
  onConfirmClick(): void {
    this.clienteService.remover(this.data).subscribe(() => {
      this.dialogRef.close(this.data);
      this.openSnackBar(`Cliente ${this.data.nome} removido com sucesso.`)
    })
  }
  openSnackBar(mensagem: string) {
    this._snackBar.open(`${mensagem}`, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
