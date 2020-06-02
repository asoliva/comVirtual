import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SendEmailComponent} from './send-email.component';
import {AuthGuardGuard} from '../../../services/auth/guards/auth-guard.guard';


const routes: Routes = [{
  path: 'send-email',
  component: SendEmailComponent,
  canActivate: [AuthGuardGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendEmailRoutingModule { }
