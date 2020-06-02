import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeyesComponent} from './leyes.component';


const routes: Routes = [{
  path: 'leyes',
  component: LeyesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeyesRoutingModule { }
