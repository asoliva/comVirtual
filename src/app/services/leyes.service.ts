import { Injectable } from '@angular/core';
import {Ley} from '../interfaces/ley';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeyesService {
  leyes: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Ley>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Ley>('Leyes');
    this.leyes = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Ley;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
  getLeyes(){
    return this.leyes;
  }
}
