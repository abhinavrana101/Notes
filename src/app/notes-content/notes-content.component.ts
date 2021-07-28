import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FireService, Notes } from '../fire.service';

@Component({
  selector: 'app-notes-content',
  templateUrl: './notes-content.component.html',
  styleUrls: ['./notes-content.component.scss']
})
export class NotesContentComponent implements OnInit,OnChanges {
  
  @Input() noteId : string = '';
  lastId : string = '';
  note : Notes ;
  formatVal : string = '';
  fontFamily : string 
  
  constructor(private fire:FireService) {
    this.note =  {title:'',content:'',date:''};
    this.fontFamily ="default"
  }
  initialiseVar(){
    this.note =  {title:'',content:'',date:''};
  }
  
  ngOnInit(): void {
    
  }
  ngOnChanges(){
    
    this.getNoteDetail()
  }
  
  updateLastId(id:string){
    this.lastId = id
    console.log(this.lastId);
    console.log(this.noteId);
   
    // else{
      this.lastId = String(Number(this.lastId) + 1);
    // }
  }
  
  addNote(){
     if(this.lastId == ''){ this.lastId = '1'}
    console.log(this.lastId)
    this.note.title = "New Note";
    this.note.date = this.createDate();
    // console.log(this.note); return;
    this.fire.addNote(this.note,this.lastId)
    this.initialiseVar();
  }
  
  getNoteDetail(){
    this.fire.getNoteById(this.noteId).subscribe(res=>{
      this.note = res.data() as Notes
    })
  }
  
  createDate(){
    // let d = new Date().getDate();
    // let m = new Date().getMonth();
    // let
    return new Date().getMonth()+1 + '/'+ new Date().getDate() + '/'+ new Date().getFullYear();
    
    
  }
  updateNote(){
    this.fire.updateNote(this.noteId,this.note);
    this.initialiseVar(); 
  }

  checkFormatVal(val:string){
    if(val == 'b'){
      this.formatVal = 'b'
    }
    if(val == 'i'){
      this.formatVal = 'i'
    }
  }

  getFontFamily(){

  }
  
}
