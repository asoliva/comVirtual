import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DenunciasComponent} from './denuncias.component';
import {AuthGuardGuard} from '../../services/auth/guards/auth-guard.guard';


const routes: Routes = [
  {
    path: 'denuncias',
    component: DenunciasComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciasRoutingModule { }
