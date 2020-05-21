import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home/home.module').then(m => m.HomeModule)},
  {path: '', loadChildren: () => import('./virtualcom/virtualcom/virtualcom.module').then(m => m.VirtualcomModule)},
  {path: '', loadChildren: () => import('./usuarios/usuarios/usuarios.module').then(m => m.UsuariosModule)},
  {path: '', loadChildren: () => import('./multas/multas/multas.module').then(m => m.MultasModule)},
  {path: '', loadChildren: () => import('./denuncias/denuncias/denuncias.module').then(m => m.DenunciasModule)},
  {path: '', loadChildren: () => import('./login/login/login.module').then(m => m.LoginModule)},
  {path: '', loadChildren: () => import('./login/send-email/send-email/send-email.module').then(m => m.SendEmailModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
