import { Component, OnInit } from '@angular/core';
import {LeyesService} from '../../services/leyes.service';
import {PageEvent} from '@angular/material/paginator';
import {AuthService} from '../../services/auth/auth.service';
import {Acceso} from '../../interfaces/usuario';
import {UsuariosService} from '../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-leyes',
  templateUrl: './leyes.component.html',
  styleUrls: ['./leyes.component.css'],
  providers: [AuthService]
})

export class LeyesComponent implements OnInit {
  // Paginator
  // tslint:disable-next-line:variable-name
  page_size = 5;
  // tslint:disable-next-line:variable-name
  page_number = 1;
  pageSizeOptions: [ 5 , 10 , 15 , 20];
  leyes: any = [];
  email: any;
  acceso: Acceso;
  constructor(private leyesService: LeyesService, private authService: AuthService,
              private usuariosService: UsuariosService, private route: Router) {
    this.leyesService.getLeyes().subscribe(leyes => {
      this.leyes = leyes;
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(user => {
      this.email = user.email;
      this.usuariosService.getUsuario(user.uid).subscribe(usuario => {
        this.acceso = usuario[0].acceso;
        if (this.acceso === '0') {
          this.route.navigate(['login']);
          window.alert('No tienes permiso para acceder a la página');
        }
      });
    });
  }
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }
}
