import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MultasComponent} from './multas.component';
import {AuthGuardGuard} from '../../services/auth/guards/auth-guard.guard';


const routes: Routes = [
  {
    path: 'multas',
    component: MultasComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultasRoutingModule {

}
