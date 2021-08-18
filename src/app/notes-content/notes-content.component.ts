import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FireService, Notes } from '../fire.service';

@Component({
  selector: 'app-notes-content',
  templateUrl: './notes-content.component.html',
  styleUrls: ['./notes-content.component.scss']
})
export class NotesContentComponent implements OnInit {
  
  noteId : string = '';
  @Output() callParent = new EventEmitter<any>();
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
 

 

  
  getNoteDetail(id:string){
    console.log('in note detail')
    this.initialiseVar()

    this.noteId = id
     console.log(id)
    console.log(this.noteId)
    this.fire.getNoteById(id).subscribe(res=>{
      this.note = res.data() as Notes
    })
  }
  
  
  updateNote(){
    console.log(this.noteId)
    this.fire.updateNote(this.noteId,this.note);
    this.initialiseVar(); 
    this.callParent.emit();
  }
  
  checkFormatVal(val:string){
    console.log(val)
    if(val == 'b'){
      this.formatVal = 'b'
    }
    if(val == 'i'){
      this.formatVal = 'i'
    }
  }
  
  
}
