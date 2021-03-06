import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuario.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EncriptService} from '../../services/encript.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [AuthService],
})
export class UsuariosComponent implements OnInit {
  usuarios: any = []; // <--- Guardo todos los usuarios
  // Filtro
  filterPost = '';
  // Campos para editar un usuario
  // -----------------------------------
  editNombre: any;
  editApellido: any;
  editGenero: any;
  editDNI: any;
  editDireccion: any;
  editMovil: any;
  editAcceso: any;
  editPassword: any;
  // -----------------------------------
  // Usuario plantilla
  // -----------------------------------
  usuario: any = {
    nombre: '',
    apellidos: '',
    dni: '',
    password: '',
    movil: '',
    email: '',
    direccion: '',
    acceso: '',
    idGenero: ''
  }
  // ------------------------------------------------------
  // ---------------------Control del formulario de editar usuario--------------------------
  editUsuario = new FormGroup({
    editNombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    editApellidos: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    editAcceso: new FormControl('-1', [Validators.min(0)]),
    editGenero: new FormControl(''),
    // tslint:disable-next-line:max-line-length
    editMovil: new FormControl('', [Validators.required, Validators.pattern('[6-7]{1}[0-9]{8}')]),
    editDNI: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}-[A-Za-z]{1}')]),
    editDireccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  })
  email: any;
  acceso: any;
  // ------------------------------Paginator------------------------------------
  // tslint:disable-next-line:variable-name
  page_size = 5;
  // tslint:disable-next-line:variable-name
  page_number = 1;
  pageSizeOptions: [ 5 , 10 , 15 , 20];
  userDetails: any = ' ';

  // -------------------------------------------------------------------------------------------
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UsuariosService, private encript: EncriptService, private authService: AuthService, private route: Router) {
    this.userService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario;
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

  // ------------------------Método para cargar el usuario a editar--------------------------------
  cargarUsuario(usuario) {
    this.usuario = usuario;
  }

  // -----------------------------------------------------------------------------------------------
  // ------------------------Métodos para obtener valores de género y acceso------------------------
  getGenero(genero) {
    if (genero === '0') {
      return 'Hombre';
    } else {
      return 'Mujer';
    }
  }

  getAcceso(acceso) {
    if (acceso === '0' || acceso === 0) {
      return 'Inhabilitado';
    } else if (acceso === '1' || acceso === 1) {
      return 'Administrador';
    } else {
      return 'Normal';
    }
  }

  // ----------------------------------------------------------------------------------------------------
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  get nombreFormularioEdit() {
    return this.editUsuario.get('editNombre');
  }

  get apellidosFormularioEdit() {
    return this.editUsuario.get('editApellidos');
  }

  get movilFormularioEdit() {
    return this.editUsuario.get('editMovil');
  }

  get dniFormularioEdit() {
    return this.editUsuario.get('editDNI');
  }

  get direccionFormularioEdit() {
    return this.editUsuario.get('editDireccion');
  }

  // ----------------------------------------------------------------------------------------------------------
  // -----------------------------------------Eliminar User----------------------------------------------------
  eliminarUsuario() {
    this.userService.borrarUsuario(this.usuario.id);
  }

  // -------------------------------------------------------------------------------------------------------------
  // ------------------------------------------Editar User-----------------------------------------------------
  abrirModificar() {
    this.editNombre = this.usuario.nombre;
    this.editApellido = this.usuario.apellidos;
    this.editGenero = this.usuario.idGenero;
    this.editDNI = this.usuario.dni;
    this.editDireccion = this.usuario.direccion;
    this.editMovil = this.usuario.movil;
    this.editAcceso = this.usuario.acceso;
    this.editPassword = this.usuario.password;
  }

  modificarUser() {
    if (this.editUsuario.valid) {
      this.usuario.nombre = this.editUsuario.get('editNombre').value;
      this.usuario.apellidos = this.editUsuario.get('editApellidos').value;
      this.usuario.direccion = this.editUsuario.get('editDireccion').value;
      this.usuario.movil = this.editUsuario.get('editMovil').value;
      this.usuario.dni = this.editUsuario.get('editDNI').value;
      this.usuario.acceso = this.editUsuario.get('editAcceso').value;
      this.usuario.idGenero = this.editUsuario.get('editGenero').value;
      this.userService.editarUsuario(this.usuario);
      window.alert('Cambios realizados con éxito');
    } else {
      console.log('error');
    }
  }

  // -------------------------------------------------------------------------------------------------------------
  // --------------------------------------------Controlar Repeticiones------------------------------------------
  // -------------------------------------------------------------------------------------------------------------
  // --------------------------------------------Acceso(Login)----------------------------------------------------
  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

  details(user: any) {
    this.userDetails = user;
  }
}
