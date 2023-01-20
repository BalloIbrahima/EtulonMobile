import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseJoueurService {

  constructor(private ngFirestore: AngularFirestore){ }

  create(user: any) {
    return this.ngFirestore.collection('User').doc(user.getUid()).set(Object.assign({}, user));
  }
   get(id:any){
    return this.ngFirestore.collection('User').doc(id).get()
   }

  getTasks() {
    return this.ngFirestore.collection('User').snapshotChanges();
  }

  getTask(id:any) {
    return this.ngFirestore.collection('User').doc(id).valueChanges();
  }
}
