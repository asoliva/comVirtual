import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Multa} from '../interfaces/multa';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultasService {
  multas: Observable<Multa[]>;
  private itemsCollection: AngularFirestoreCollection<Multa>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Multa>('Multas');
    this.multas = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Multa;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
  getMultas(){
    return this.multas;
  }

  addMulta(multa: Multa) {
    this.itemsCollection.add(multa);
  }

  editarMulta(multa) {
    this.afs.collection('Multas').doc(multa.id).set(multa);
  }

  borrarMulta(id) {
    this.afs.collection('Multas').doc(id).delete();
  }
}
