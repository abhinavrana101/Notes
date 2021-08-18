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
  
  showParent : boolean = true;
  showChild : boolean = true;
  note =  {title:'',content:'',date:''};
  
  @ViewChild(NotesContentComponent) child:NotesContentComponent | undefined;
  constructor(private fire:FireService) { 
    this.lastDocId ='';
    this.getWindowSize();
    this.getNotes()
    
  }
  
  ngOnInit(): void {
  }
  
  getWindowSize(){
    if(window.screen.width <768){
      this.showChild = false;
      this.selectedNote = ''
    }
  }
  
  getNotes(){
    this.fire.getNotes().subscribe(res=>{
      this.NotesList = res.map(e=>{
        return {
          id:e.payload.doc.id,
          data: e.payload.doc.data()
        }
      });
      this.NotesList.sort((a,b)=> Date.parse(b['data']['date']) - Date.parse(a['data']['date']))
      // console.log(this.NotesList)
      if(this.NotesList.length>0){
        // this.getNoteContent(this.NotesList[0]['id'])
        // this.selectedNote = this.NotesList[0]['id']
      }
      else{ this.child?.initialiseVar()}
    });
    
    
    
    
  }
  
  addNote(){
    this.note.title = "New Note";
    this.note.content = '';
    this.note.date = this.createDate();
    this.fire.addNote(this.note);
  }
  
  getNoteContent(id:string){
    this.selectedNote = id;
    
    if(window.screen.width <768){
      
      this.showChild = true;
      setTimeout(()=>{
        this.child?.getNoteDetail(id)
      },100)
      return;
    }
    this.child?.getNoteDetail(id)
  }
  
  // addNote(){
  //   // this.showChild= true
  //   this.child?.addNote();
  //   // setTimeout(()=>{
  //   //   this.child?.addNote();
  //   // },100) 
  // }
  
  createDate(){
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    return `${y}/${m}/${d} ${h}:${min}:${s}`
  }
  
  deleteNote(){
    this.fire.deleteNote(this.selectedNote)
    this.child?.initialiseVar();
    if(window.screen.width <768){
      this.showChild = false;
    }
    
  }
  
  initialiseVar(e:Event){
    if(window.screen.width <768){
      this.showChild = false;
    }
    let alertDiv = document.getElementById('alertMsg') as HTMLElement;
    alertDiv.style.display = "inline";
    setInterval(()=>{
      alertDiv.style.display = "none";
    },3000)
    
  }
  
  changeTheme(){
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
  
  
}
