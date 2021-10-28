import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditClientesComponent } from './edit-clientes/edit-clientes.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { DialogRemoverComponent } from './dialog-remover/dialog-remover.component'


@NgModule({
  declarations: [
    ClientesComponent,
    EditClientesComponent,
    DialogRemoverComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ClientesModule { }
