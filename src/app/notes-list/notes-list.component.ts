import { Component, OnInit, ViewChild } from '@angular/core';
import { FireService } from '../fire.service';
import { NotesContentComponent } from '../notes-content/notes-content.component';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  
  NotesList : Array<any> = [];
  selectedNote : string= '';
  lastDocId : string ;

  @ViewChild(NotesContentComponent) child:NotesContentComponent | undefined;
  constructor(private fire:FireService) { 
    this.lastDocId ='';
    this.getNotes()
  }
  
  ngOnInit(): void {
  }
  
  getNotes(){
    this.fire.getNotes().subscribe(res=>{
      this.NotesList = res.map(e=>{
        return {
          id:e.payload.doc.id,
          data: e.payload.doc.data()
        }
      });
      console.log(this.NotesList)
      this.NotesList.sort((a,b)=> Number(b['id'])-Number(a['id']))
    
      if(this.NotesList.length>0){
      this.getNoteContent(this.NotesList[0]['id'])
        this.lastDocId = this.selectedNote
        this.child?.updateLastId(this.lastDocId)
    }
    if(this.NotesList.length == 0){

    this.child?.initialiseVar()
    }
    });
    
    

    
  }
  
  // getNotes(){
  //   this.fire.getNotes().subscribe(res=>{
  //     this.NotesList = res;
  //     console.log(this.NotesList)
  //   })
  // }
  
  getNoteContent(id:string){
    this.selectedNote = id;
  }
  deleteNote(){
    this.fire.deleteNote(this.selectedNote)
  }
  
}
