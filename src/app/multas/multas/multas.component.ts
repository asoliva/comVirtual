import { Component, OnInit } from '@angular/core';
import {MultasService} from '../../services/multas.service';
import {UsuariosService} from '../../services/usuario.service';
import {LeyesService} from '../../services/leyes.service';
import {Multa} from '../../interfaces/multa';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css'],
  providers: [AuthService]
})
export class MultasComponent implements OnInit {
  multas: any = []; // <-- Guardo todas las multas
  usuarios: any = []; // <-- Guardo todos los usuarios
  leyes: any = []; // <-- Guardo todas las leyes
  // ---------------------------Plantilla de multa -------------------------------
  multa: any = {
    idUsuario: '',
    fecha: Date.now(),
    descripcion: '',
    idLey: ''
  };
  // -----------------------------------------------------------------------------
  multaForm = new FormGroup({
    addUsuario: new FormControl('-1', [Validators.minLength(4)]),
    addLey: new FormControl('-1', [Validators.minLength(4)]),
    addDescripcion: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(25)])
  });
  errorNombre: boolean;
  errorLey: boolean;
  errorDescripcion: boolean;
  email: any;
  acceso: any;
  multasUser: any = [];
  usuario: any;
  // Paginator
  // tslint:disable-next-line:variable-name
  page_size = 5;
  // tslint:disable-next-line:variable-name
  page_number = 1;
  pageSizeOptions: [ 5 , 10 , 15 , 20];
  multaDetails: Multa = {
    idUsuario: '',
    fecha: null,
    descripcion: '',
    idLey: ''
  };
  // tslint:disable-next-line:max-line-length
  constructor(private multaService: MultasService, private usuariosService: UsuariosService, private leyesService: LeyesService, private authService: AuthService, private route: Router) {
    this.multaService.getMultas().subscribe(multas => {
      this.multas = multas;
    });
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
    this.leyesService.getLeyes().subscribe(leyes => {
      this.leyes = leyes;
    });
    // ---------------
    this.authService.getCurrentUser().then(user => {
      this.email = user.email;
      this.usuariosService.getUsuario(user.uid).subscribe(usuario => {
        this.acceso = usuario[0].acceso;
        console.log(this.acceso);
        if (this.acceso === '2') {
          this.multaService.getMultaUser(usuario[0]).subscribe(multa => {
            this.multasUser = multa;
          });
        }
        if (this.acceso === '0') {
          this.route.navigate(['login']);
          window.alert('No tienes permiso para acceder a la página');
        }
      });
    });

  }

    ngOnInit() {}
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  elminarMulta() {
    this.multaService.borrarMulta(this.multa.id);
  }
  cargarMulta(multa: Multa) {
    this.multa = multa;
  }
  // ---------------------------------------Añadir Multa-------------------------------------------------
  addMulta(idUsuario: string, descripcion: string, idLey: string) {
    if(this.multaForm.valid) {
      this.multa.idUsuario = idUsuario;
      this.multa.descripcion = descripcion;
      this.multa.idLey = idLey;
      this.multa.fecha = Date.now();
      this.multaService.addMulta(this.multa);
    } else {
      if (!this.multaForm.get('addUsuario').valid) {
      this.errorNombre = true;
      } else {
        this.errorNombre = false;
      }
      if (!this.multaForm.get('addLey').valid) {
        this.errorLey = true;
      } else {
        this.errorLey = false;
      }
      if (!this.multaForm.get('addDescripcion').valid) {
        this.errorDescripcion = true;
      } else {
        this.errorDescripcion = false;
      }
    }
  }
  erroresFalse() {
    this.errorNombre = false;
    this.errorLey = false;
    this.errorDescripcion = false;
  }
  // ------------------------------------------------------------------------------------------------------
  // <-- Obtener usuario mediante ID
  getUser(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.usuarios.length; i++) {
      if (id === this.usuarios[i].id) {
        return this.usuarios[i];
      }
    }
  }
  // <-- Obtener leyes mediante ID
  getLey(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.leyes.length; i++) {
      if (id === this.leyes[i].id) {
        return this.leyes[i];
      }
    }
  }
  // ----------------------------------------Propiedades---------------------------------------------------
  get userForm() {
    return this.multaForm.get('addUsuario');
  }
  get leyForm() {
    return this.multaForm.get('addLey');
  }
  get descripcionForm() {
    return this.multaForm.get('addDescripcion');
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

  details(multa: any) {
    console.log(this.multaDetails);
  }
}
