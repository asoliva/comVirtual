import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Denuncia} from '../interfaces/denuncia';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DenunciasService {
  denuncias: Observable<Denuncia[]>;

  private itemsCollection: AngularFirestoreCollection<Denuncia>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Denuncia>('Denuncias');
    this.denuncias = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Denuncia;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
  getDenuncias(){
    return this.denuncias;
  }



  addDenuncia(denuncia: Denuncia) {
    this.itemsCollection.add(denuncia);
  }

  editarDenuncia(denuncia) {
    this.afs.collection('Denuncias').doc(denuncia.id).set(denuncia);
  }

  borrarDenuncia(id) {
    this.afs.collection('Denuncias').doc(id).delete();
  }
}
