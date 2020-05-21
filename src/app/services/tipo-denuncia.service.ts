import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {TipoDenuncia} from '../interfaces/tipo-denuncia';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDenunciaService {
  tipoDenuncias: Observable<TipoDenuncia[]>;
  private itemsCollectionTipo: AngularFirestoreCollection<TipoDenuncia>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollectionTipo = afs.collection<TipoDenuncia>('tipoDenuncia');
    this.tipoDenuncias = this.itemsCollectionTipo.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as TipoDenuncia;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
  getTipoDenuncias(){
    return this.tipoDenuncias;
  }
}
