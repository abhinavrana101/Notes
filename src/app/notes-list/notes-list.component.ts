import { Component, OnInit } from '@angular/core';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  
  NotesList : Array<any> = [];
  constructor(private fire:FireService) { 
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
    });
    
    
  }
  
}
