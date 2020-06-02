import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Usuario} from '../interfaces/usuario';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: Observable<Usuario[]>;
  private itemsCollection: AngularFirestoreCollection<Usuario>;
  constructor(private afs: AngularFirestore) {

  }
  getUsuarios(){
    this.itemsCollection = this.afs.collection<Usuario>('Usuarios');
    this.usuarios = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return this.usuarios;
  }
  getUsuario(uid: string) {
    this.itemsCollection = this.afs.collection<Usuario>('Usuarios', ref => ref.where('idAuth', '==', uid));
    this.usuarios = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return this.usuarios;
  }
  addUsuario(usuario: Usuario) {
    this.itemsCollection.add(usuario);
  }

  editarUsuario(usuario) {
    this.afs.collection('Usuarios').doc(usuario.id).set(usuario);
  }

  borrarUsuario(id) {
    this.afs.collection('Usuarios').doc(id).delete();
  }
}
