import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultasRoutingModule } from './multas-routing.module';
import { MultasComponent } from './multas.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UsuariosModule} from '../../usuarios/usuarios/usuarios.module';




@NgModule({
  declarations: [MultasComponent],
  imports: [
    CommonModule,
    MultasRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    UsuariosModule,
  ]
})
export class MultasModule { }
