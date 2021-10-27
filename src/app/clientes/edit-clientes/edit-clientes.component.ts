import { Cliente } from './../model/cliente';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styleUrls: ['./edit-clientes.component.scss']
})
export class EditClientesComponent implements OnInit {
  reactiveForm: FormGroup;
  nome = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email])
  telefone = new FormControl('', [Validators.required])

  getErrorMsgEmail() {
    if (this.email.hasError('required')) {
      return 'O Campo é obrigatório.';
    }
    if(this.email.hasError('email')) {
      return 'Não é um email valido.'
    }
    return '';
  }
  getErrorMsgNome() {
    if(this.nome.hasError('required')) {
      return 'O campo é obrigatório.'
    }
    return ''
  }
  getErrorMsgTel() {
    if(this.telefone.hasError('required')) {
      return 'O campo é obrigatório.'
    }
    return ''
  }

  constructor(public dialogRef: MatDialogRef<EditClientesComponent>, @Inject(MAT_DIALOG_DATA) public data: Cliente, private builder: FormBuilder) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  cadastrar(data: Cliente): void {
    //console.log(data)
  }

}
