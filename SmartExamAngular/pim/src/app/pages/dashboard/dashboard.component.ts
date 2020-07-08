import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Chart from 'chart.js';
import { MyDialogComponent } from 'app/my-dialog/my-dialog.component';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { question } from 'app/model/question.model';
import { reponse } from 'app/model/reponse.model';
import { UserServiceService } from 'app/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClassesService } from 'app/classes.service';
import { CorrectionserviceService } from 'app/correctionservice.service';



@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})


export class DashboardComponent implements OnInit{
  err: string;

 /* Role = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'enseignant', viewValue: 'enseignant'},
    {value: 'etudiant', viewValue: 'etudiant'}
  ];*/


 constructor(public dialog: MatDialog,private service:UserServiceService, 
  private servicecl:ClassesService ,private _snackBar: MatSnackBar, private sevicecor:CorrectionserviceService, private router : Router){}
 

 selectedValue : string;
 username: string;
 password: string;
 question=new question();
 reponse= new reponse()
 dataarray=[]
 public name:string;
 role:string;
 enseignant:boolean
 admin:boolean
 etudiant:boolean
 classes :any ;
 levels =[];
 lvl : string ="hi"
 pdfroot:string;
arrayexam:any[]=[];
minDate: Date;
maxDate: Date;

 
 ansarray=[]
 
 qtext:any
  arraymodule:any[]=[];
  arrayclass:any[]=[];
idclass:number
idmodule:number
 reptext:any
 questarray=[]
 typearray=["multiple","unique"]
 selected:any
 checked:boolean
 resutstring:string=""
    ngOnInit(){

      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 1, 11, 31);
      
      if(localStorage.getItem('role')=='admin'){
        this.enseignant=false
        this.admin=true
        this.etudiant=false
      }else if(localStorage.getItem('role')=='enseignant'){
        this.enseignant=true
        this.admin=false
        this.etudiant=false
        this.ansarray.push(reponse)
this.dataarray.push(question)
this.sevicecor.getAllmodule().subscribe( res1 => {
  // console.log(res1); 
 this.arraymodule=res1;

  })
  this.servicecl.getAllclasses().subscribe( res1 => {
    // console.log(res1); 
   this.arrayclass=res1;
  
    })

      }else{
        this.enseignant=false
        this.admin=false
        this.etudiant=true
      }
    
    this.servicecl.getAll().subscribe(heroes => {this.levels = heroes
      console.log(heroes)}
          );


    console.log(this.lvl)

    

    }
    addquestion(i){
      var    qtext= ((document.getElementById("question"+i) as HTMLInputElement).value)
      
      if(this.selected=="multiple"){
        qtext="** "+qtext+"\n"
      }else{
        qtext="* "+qtext+"\n"
      }
      
      var j=0
      while(((document.getElementById("reponse"+(i)+(j)) as HTMLInputElement))!= null ){
     // for (let x = 0; x <= j; x++) {
        var  reptext =""+((document.getElementById("reponse"+(i)+(j)) as HTMLInputElement).value)
        
        /*if(this.checked==true){
reptext="+"+reptext
        }else{
          reptext="-"+reptext
        }*/
      qtext +=reptext+"\n"
     j++
      }

      console.log(qtext)
      this.questarray.push(qtext)
      this.dataarray.push(question)


    }
    delquestion(i){
      
      //fasse5 lquestion ml tableau mta3 les questions
      this.questarray.splice(i)
      this.dataarray.splice(i)


    }
    addreponse(j){

      this.ansarray.push(reponse)


    }
    delreponse(j){
//fasse5 lreponse ?????
      this.ansarray.splice(j-1,1)


    }
    enregistrer(){
    
      var idens = localStorage.getItem('id') as any as number
     // var idclass = ((document.getElementById("idclass") as HTMLInputElement).value) 
      //var idmodule =((document.getElementById("module") as HTMLInputElement).value) 
      var nb = ((document.getElementById("nbrecopie") as HTMLInputElement).value) as any as number
      



      var    extext= ((document.getElementById("examen") as HTMLInputElement).value) as any as string
     // var    modtext= ((document.getElementById("module") as HTMLInputElement).value)
      var    date= ((document.getElementById("date") as HTMLInputElement).value)as any as Date
      var    remtext= ((document.getElementById("remarque") as HTMLInputElement).value)
      this.resutstring+="# AMC-TXT source"+"\n"+"PaperSize: A4"+"\n"+"\n"+"Lang: FR"+"\n"+"Code:4"+"\n"+"Title: "+extext+"\n"+"Presentation: "+remtext+"\n"
if(this.checked==true){
  this.resutstring+="SeparateAnswerSheet:1"+"\n"
  this.resutstring+="AnswerSheetTitle:"+"\n"
  this.resutstring+="AnswerSheetPresentation:"+"\n"
}
      this.addquestion(this.questarray.length)
      this.dataarray.splice(this.dataarray.length-1,1)
      for (let x = 0; x < this.questarray.length; x++) {
      this.resutstring+=" "+this.questarray[x]



//console.log(this.questarray[x])


    }
    console.log(this.resutstring)
    console.log(nb+" "+extext+" "+idens+" "+this.idclass+" "+this.idmodule)
    this.service.generateXam(nb,extext,idens,this.idclass,this.idmodule,this.resutstring).subscribe( res => {
     
      
      console.log(res) 
      this.pdfroot="uploads/"+res+"";
     // this.openDialog()


    })
    
  }


    
    
      openDialog(): void {
        const dialogRef = this.dialog.open(MyDialogComponent, {

          data: {pdfroot: this.pdfroot },
          
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(MyDialogComponent.name);
         this.name=result 
          
        });
      }
      onOptionsSelected(value:string){
        this.lvl = value;
        this.servicecl.getClasses(this.lvl).subscribe(heroes => {this.classes = heroes;
          console.log(heroes);
          console.log(this.classes)}
              );
    
   }
      
      newUser() :void {
        var    name= ((document.getElementById("name") as HTMLInputElement).value)
        var    email= ((document.getElementById("email") as HTMLInputElement).value)
        var    adress= ((document.getElementById("adress") as HTMLInputElement).value)
        var    phone= ((document.getElementById("phone") as HTMLInputElement).value)
        var    password= ((document.getElementById("password") as HTMLInputElement).value)
        var    cpassword= ((document.getElementById("confirmp") as HTMLInputElement).value)
        var    role= ((document.getElementById("role") as HTMLInputElement).value)
        

        if(password==cpassword){
        if (role=="etudiant"){
          var idclass = ((document.getElementById("classes") as HTMLInputElement).value) as any as number
        this.service.newST(name, email,  adress, phone, password,idclass).subscribe( res => {
          console.log(res)
          })
          this.service.sendmail(name,email,password).subscribe(res=>{
            console.log(res)
          })
          this.openSnackBar("student added","Close")
          this.router.navigate(['/table'])
      }if(role=="enseignant"){
        this.service.newT(name, email,  adress, phone, password).subscribe( res => {
          console.log(res)
          })
          this.service.sendmail(name,email,password).subscribe(res=>{
            console.log(res)
          })
          this.openSnackBar("teacher added","Close")
          this.router.navigate(['/table'])

      }
    if(role=="admin"){

      this.service.newA(name, email,  adress, phone, password).subscribe( res => {
        console.log(res)
        })
        this.service.sendmail(name,email,password).subscribe(res=>{
          console.log(res)
        })
        this.openSnackBar("Admin added","Close")
        this.router.navigate(['/table'])



    }
    }else{
        this.openSnackBar("passwords do not match","Close")
        
      }}

     
      openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
      }
      
    }
   
    
    
    

