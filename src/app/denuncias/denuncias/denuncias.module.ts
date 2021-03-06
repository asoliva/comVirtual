import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciasRoutingModule } from './denuncias-routing.module';
import { DenunciasComponent } from './denuncias.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UsuariosModule} from '../../usuarios/usuarios/usuarios.module';

@NgModule({
  declarations: [DenunciasComponent],
  imports: [
    CommonModule,
    DenunciasRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    UsuariosModule
  ]
})
export class DenunciasModule { }
