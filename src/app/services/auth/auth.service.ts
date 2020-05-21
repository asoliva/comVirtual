import { Injectable } from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {UsuariosService} from '../usuario.service';
import {Usuario} from '../../interfaces/usuario';

@Injectable()
export class AuthService {
  public usuario: Usuario;
  public user: User;
  constructor(public afAuth: AngularFireAuth, private afdatabase: AngularFireDatabase, private userService: UsuariosService) { }
  async sendVerificationEmail(): Promise<void>{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  async login(email: string, password: string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
