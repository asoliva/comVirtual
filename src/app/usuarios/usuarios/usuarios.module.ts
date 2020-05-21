import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserfilterPipe} from '../../pipes/userfilter.pipe';

@NgModule({
  declarations: [UsuariosComponent, UserfilterPipe],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UsuariosModule { }
