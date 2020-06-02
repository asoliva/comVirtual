import { Component, OnInit } from '@angular/core';
import {DenunciasService} from '../../services/denuncias.service';
import {UsuariosService} from '../../services/usuario.service';
import {TipoDenunciaService} from '../../services/tipo-denuncia.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Denuncia} from '../../interfaces/denuncia';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css'],
  providers: [AuthService]
})
export class DenunciasComponent implements OnInit {
  emailUser: string;
  denuncias: any = []; // <--- Guardo todas las denuncias
  usuarios: any = []; // <--- Guardo los usuarios
  tipoDenuncias: any = []; // <--- Guardo los tipos de denuncias diferentes
  // Formulario de validaciones de añadir
  formulario = new FormGroup({
    usuario: new FormControl('-1', [Validators.minLength(4)]),
    tipo: new FormControl('-1', Validators.min(0)),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(255)])
  });
  // Formulario de validaciones al editar
  formularioEditar = new FormGroup({
    estado: new FormControl('')
  });
  // Mostrar errores
  errorUsuario: boolean;
  errorTipo: boolean;
  errorDescripcion: boolean;
  // Plantilla denuncia
  denuncia: any = {
    idUsuario: '',
    tipo: '',
    descripcion: '',
    fecha: null,
    estado: 'En trámite'
  }
  email: any;
  acceso: any;
  // Paginator
  // tslint:disable-next-line:variable-name
  page_size = 5;
  // tslint:disable-next-line:variable-name
  page_number = 1;
  pageSizeOptions: [ 5 , 10 , 15 , 20];
  denunciaDetails: any = '';
  // tslint:disable-next-line:max-line-length
  constructor(private denunciaService: DenunciasService, private userService: UsuariosService, private tipoDenunciaService: TipoDenunciaService, private route: Router, private authService: AuthService) {
    this.denunciaService.getDenuncias().subscribe(denuncia => {
      this.denuncias = denuncia;
    });
    this.userService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario;
    });
    this.tipoDenunciaService.getTipoDenuncias().subscribe(tipoDenuncias => {
      this.tipoDenuncias = tipoDenuncias;
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      this.email = user.email;
      this.userService.getUsuario(user.uid).subscribe(usuario => {
        this.acceso = usuario[0].acceso;
        if (this.acceso !== '1') {
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
 // Propiedades del formulario
  get userAdd(){
    return this.formulario.get('usuario');
  }
  get tipoAdd(){
    return this.formulario.get('tipo');
  }
  get descripcionAdd(){
    return this.formulario.get('descripcion');
  }
  // Poner los errores en false
  erroresFalse() {
    this.errorUsuario = false;
    this.errorTipo = false;
    this.errorDescripcion = false;
  }
  // Añadir una denuncia
  addDenuncia(user: string, tipo: string, descripcion: string) {
    if (this.formulario.valid) {
      this.denuncia.idUsuario = user;
      this.denuncia.tipo = tipo;
      this.denuncia.descripcion = descripcion;
      this.denuncia.fecha = Date.now();
      this.denunciaService.addDenuncia(this.denuncia);
      this.formulario.reset();
    } else {
      if (!this.formulario.get('usuario').valid) {
        this.errorUsuario = true;
      } else {
        this.errorUsuario = false;
      }
      if (!this.formulario.get('tipo').valid) {
        this.errorTipo = true;
      } else {
        this.errorTipo = false;
      }
      if (!this.formulario.get('descripcion').valid) {
        this.errorDescripcion = true;
      } else {
        this.errorDescripcion = false;
      }
    }
  }
  // Para obtener el tipo de denuncia
  getTipo(tipo) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.tipoDenuncias.length; i++) {
      if (tipo === this.tipoDenuncias[i].id){
        return this.tipoDenuncias[i].tipo;
      }
    }
  }
  // <-- Obtener usuario mediante ID
  getUser(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.usuarios.length; i++) {
      if (id === this.usuarios[i].id) {
        return this.usuarios[i].nombre + ' ' + this.usuarios[i].apellidos;
      }
    }
  }
  // Eliminar denuncias
  eliminarDenuncia() {
    this.denunciaService.borrarDenuncia(this.denuncia.id);
  }
  cargarDenuncia (denuncia: Denuncia) {
    this.denuncia = denuncia;
  }
  logout() {
    this.authService.logout();
    this.route.navigate(['home']);
  }
}
