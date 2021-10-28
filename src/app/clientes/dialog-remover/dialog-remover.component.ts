import { Cliente } from './../model/cliente';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remover',
  templateUrl: './dialog-remover.component.html',
  styleUrls: ['./dialog-remover.component.scss'],
})
export class DialogRemoverComponent implements OnInit {
  message: string = 'Deseja realmente deletar?';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogRemoverComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.message = `Deseja realmente excluir o Cliente: ${data.nome}?`;
    }
  }

  ngOnInit(): void {}
  onConfirmClick(): void {
    this.dialogRef.close(this.data);
  }
}
