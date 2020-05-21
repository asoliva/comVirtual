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
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UsuariosService, private encript: EncriptService, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:max-line-length
  addUser(addNombre: string, addApellidos: string, addDireccion: string, addDni: string, addEmail: string, addMovil: string, addPassword: string) {
      if (this.formRegister.get('addGenero').value !== null) {
        this.usuario.nombre = addNombre;
        this.usuario.apellidos = addApellidos;
        this.usuario.dni = addDni;
        this.usuario.password = this.encript.set('7786272228705496', addPassword);
        this.usuario.movil = addMovil;
        this.usuario.email = addEmail;
        this.usuario.direccion = addDireccion;
        this.usuario.idGenero = this.genero;
        this.authService.register(this.formRegister.get('addEmail').value, this.encript.set('7786272228705496', this.formRegister.get('addPassword').value)).then(user => {
          this.usuario.idAuth = user.user.uid;
          this.userService.addUsuario(this.usuario);
          this.route.navigate(['/send-email']);
        });
      }
  }
  async onLogin(email: string, password: string){
    try {
      const user = await this.authService.login(email, this.encript.set('7786272228705496', password));
      if (user) {
        if (user.user.emailVerified) {
          // Redirect a la página de administración
          this.route.navigate(['comvirtual']);
        } else {
          this.route.navigate(['send-email']);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
