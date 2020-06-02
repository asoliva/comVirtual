import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VirtualcomComponent} from './virtualcom.component';
import {AuthGuardGuard} from '../../services/auth/guards/auth-guard.guard';



const routes: Routes = [
  {
    path: 'comvirtual',
    component: VirtualcomComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualcomRoutingModule { }
