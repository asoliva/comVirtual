import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualcomRoutingModule } from './virtualcom-routing.module';
import { VirtualcomComponent } from './virtualcom.component';


@NgModule({
  declarations: [VirtualcomComponent],
  imports: [
    CommonModule,
    VirtualcomRoutingModule
  ]
})
export class VirtualcomModule { }
