import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MultasComponent} from './multas.component';


const routes: Routes = [
  {
    path: 'multas',
    component: MultasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultasRoutingModule {

}
