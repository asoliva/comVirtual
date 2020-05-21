import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VirtualcomComponent} from './virtualcom.component';


const routes: Routes = [
  {
    path: 'comvirtual',
    component: VirtualcomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualcomRoutingModule { }
