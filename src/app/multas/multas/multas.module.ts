import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultasRoutingModule } from './multas-routing.module';
import { MultasComponent } from './multas.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MultasComponent],
  imports: [
    CommonModule,
    MultasRoutingModule,
    ReactiveFormsModule
  ]
})
export class MultasModule { }
