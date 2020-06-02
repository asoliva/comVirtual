import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {UsuariosService} from '../../services/usuario.service';

@Component({
  selector: 'app-virtualcom',
  templateUrl: './virtualcom.component.html',
  styleUrls: ['./virtualcom.component.css'],
  providers: [AuthService]
})
export class VirtualcomComponent implements OnInit {
  usuarios: any = [];
  usuario: any = [];
  email: any;
  acceso: any;
  // Bar char
  constructor(private authService: AuthService, private route: Router, private userService: UsuariosService) {
    this.userService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario;
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      this.email = user.email;
      this.userService.getUsuario(user.uid).subscribe(usuario => {
        this.acceso = usuario[0].acceso;
        if (this.acceso === '0') {
          this.route.navigate(['login']);
          window.alert('No tienes permiso para acceder a la página');
        }
      });
    });
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

}
