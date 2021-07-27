import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private afs:AngularFirestore) { }

  getNotes(){
    return this.afs.collection('notes').snapshotChanges();
  }
  
}

// export interface Notes {
//   id:string,
//   title : string;
//   content:string;
// }
