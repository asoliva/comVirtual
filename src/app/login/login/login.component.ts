import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuariosService} from '../../services/usuario.service';
import {EncriptService} from '../../services/encript.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  usuarios: any = []; // <-- Guardo todos los usuarios
  genero = '0';
  formRegister = new FormGroup({
    addNombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    addApellidos: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    addGenero: new FormControl('-1', ),
    // tslint:disable-next-line:max-line-length
    addEmail: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    addMovil: new FormControl('', [Validators.required, Validators.pattern('[6-7]{1}[0-9]{8}')]),
    addDNI: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}-[A-Za-z]{1}')]),
    addDireccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    addPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
    addPasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
  })
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
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
    acceso: '0',
    idGenero: '',
    idAuth: ''
  }
  userLoged: any = {
    nombre: '',
    apellidos: '',
    dni: '',
    password: '',
    movil: '',
    email: '',
    direccion: '',
    acceso: '0',
    idGenero: '',
    idAuth: ''
  }
  errorNombre: boolean;
  errorApellidos: boolean;
  errorDireccion: boolean;
  errorDNI: boolean;
  errorEmail: boolean;
  errorPassword: boolean;
  errorMovil: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UsuariosService, private encript: EncriptService, private authService: AuthService, private route: Router) {
    this.userService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario;
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.authService.logout();
      }
    });
  }
  // tslint:disable-next-line:max-line-length
  addUser(addNombre: string, addApellidos: string, addDireccion: string, addDni: string, addEmail: string, addMovil: string, addPassword: string) {
    if (this.formRegister.valid) {
        if (this.passCorrecta() && !this.emailRepetido() && !this.dniRepetido()) {
              this.usuario.nombre = addNombre;
              this.usuario.apellidos = addApellidos;
              this.usuario.dni = addDni;
              this.usuario.password = this.encript.set('7786272228705496', addPassword);
              this.usuario.movil = addMovil;
              this.usuario.email = addEmail;
              this.usuario.direccion = addDireccion;
              this.usuario.idGenero = this.genero;
              this.authService.register(this.formRegister.get('addEmail').value, this.formRegister.get('addPassword').value).then(user => {
                this.usuario.idAuth = user.user.uid;
                this.userService.addUsuario(this.usuario);
                this.route.navigate(['/send-email']);
              });
        }
      } else {
        if (!this.formRegister.get('addNombre').valid) {
          this.errorNombre = true;
        } else {
          this.errorNombre = false;
        }
        if (!this.formRegister.get('addApellidos').valid) {
          this.errorApellidos = true;
        } else {
          this.errorApellidos = false;
        }
        if (!this.formRegister.get('addDireccion').valid) {
          this.errorDireccion = true;
        } else {
          this.errorDireccion = false;
        }
        if (!this.formRegister.get('addDNI').valid) {
          this.errorDNI = true;
        } else {
          this.errorDNI = false;
        }
        if (!this.formRegister.get('addEmail').valid) {
          this.errorEmail = true;
        } else {
          this.errorEmail = false;
        }
        if (!this.formRegister.get('addPassword').valid) {
          this.errorPassword = true;
        } else {
          this.errorPassword = false;
        }
        if (!this.formRegister.get('addMovil').valid) {
          this.errorMovil = true;
        } else {
          this.errorMovil = false;
        }
      }
  }
  async onLogin(email: string, password: string){
    try {
      const user = await this.authService.login(email, password);
      console.log(user.user.emailVerified);
      if (user) {
        if (user.user.emailVerified) {
          this.userService.getUsuario(user.user.uid).subscribe(usuario => {
            this.userLoged = usuario;
            if (this.userLoged[0].acceso === '0') {
              this.userLoged[0].acceso = '2';
              this.userService.editarUsuario(this.userLoged[0]);
            }
          });
          // Redirect a la página de administración
          this.route.navigate(['comvirtual']);
        } else {
          this.route.navigate(['send-email']);
        }
      }
    } catch (error) {
      console.log(error);
      window.alert('Email o contraseña incorrectos');
    }
  }
  emailRepetido() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].email === this.formRegister.get('addEmail').value) {
        return true;
      }
    }
    return false;
  }
  dniRepetido() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].dni === this.formRegister.get('addDNI').value) {
        return true;
      }
    }
    return false;
  }
  passCorrecta() {
    if (this.formRegister.get('addPassword').value === this.formRegister.get('addPasswordConfirm').value ) {
      return true;
    } else {
      return false;
    }
  }
  // Propiedades del Formulario
  get nombreFormulario() {
    return this.formRegister.get('addNombre');
  }
  get apellidosFormulario() {
    return this.formRegister.get('addApellidos');
  }
  get emailFormulario() {
    return this.formRegister.get('addEmail');
  }
  get movilFormulario() {
    return this.formRegister.get('addMovil');
  }
  get dniFormulario() {
    return this.formRegister.get('addDNI');
  }
  get direccionFormulario() {
    return this.formRegister.get('addDireccion');
  }
  get passwordFormulario() {
    return this.formRegister.get('addPassword');
  }
  get passwordFormularioConfirm() {
    return this.formRegister.get('addPasswordConfirm');
  }
}
