import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciasRoutingModule } from './denuncias-routing.module';
import { DenunciasComponent } from './denuncias.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DenunciasComponent],
  imports: [
    CommonModule,
    DenunciasRoutingModule,
    ReactiveFormsModule
  ]
})
export class DenunciasModule { }
