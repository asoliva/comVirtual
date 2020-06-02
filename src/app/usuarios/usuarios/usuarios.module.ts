import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserfilterPipe} from '../../pipes/userfilter.pipe';
import {PaginasPipe} from '../../pipes/paginas.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [UsuariosComponent, UserfilterPipe, PaginasPipe],
  exports: [
    PaginasPipe
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class UsuariosModule { }
