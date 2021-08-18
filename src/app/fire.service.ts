import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  collection: string = 'notes';
  // notes : Observable<any>;
  constructor(private afs:AngularFirestore) { 
    // this.notes = afs.collection(this.collection).snapshotChanges();
  }

  getNotes(){
    // console.log(this.notes)
    // return this.notes;
    return this.afs.collection(this.collection).snapshotChanges();
  }

  // getNoteById(id:string){
  //   return this.afs.collection(`${this.collection}/${id}`).snapshotChanges();
  // }
  addNote(note:object){
    this.afs.collection(this.collection).add(note);
  }
  deleteNote(id:string){
    this.afs.doc(`notes/${id}`).delete()
  }
  getNoteById(id:string){
    return this.afs.doc(`notes/${id}`).get()
  }
  updateNote(id:string,note:object){
    // console.log(id);
    // console.log(note)
    this.afs.doc(`notes/${id}`).update(note);
  }
  
}

export interface Notes {
  title : string;
  content:string;
  date : string;
}
