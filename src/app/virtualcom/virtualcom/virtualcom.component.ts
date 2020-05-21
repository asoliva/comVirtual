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
  emailUser: string;
  usuarios: any = [];
  constructor(private authService: AuthService, private route: Router, private userService: UsuariosService) {
    this.userService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['home']);
  }
  getUserEmail() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.emailUser === this.usuarios[i].email) {
        return this.usuarios[i].nombre + ' ' + this.usuarios[i].apellidos;
      }
    }
  }

}
