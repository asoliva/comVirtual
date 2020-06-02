import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeyesRoutingModule } from './leyes-routing.module';
import { LeyesComponent } from './leyes.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UsuariosModule} from '../../usuarios/usuarios/usuarios.module';


@NgModule({
  declarations: [LeyesComponent],
  imports: [
    CommonModule,
    LeyesRoutingModule,
    MatPaginatorModule,
    UsuariosModule
  ]
})
export class LeyesModule { }
