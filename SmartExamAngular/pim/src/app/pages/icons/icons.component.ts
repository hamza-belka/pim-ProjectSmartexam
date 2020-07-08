import { Component, OnInit } from '@angular/core';
import { CorrectionserviceService } from 'app/correctionservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MyDialogComponent } from 'app/my-dialog/my-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { ExcelService } from 'app/services/excel/excel.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: 'icons-cmp',
    moduleId: module.id,
    templateUrl: 'icons.component.html'
})

export class IconsComponent implements OnInit{
  pdfroot:string;
    arrayexam:any[]=[];
    arraymod:number[]=[];
    arrayclass:number[]=[];
    pnn:any="Onecopie";
    targetpro:string;
     
    title = 'fileUpload';
    images;
    multipleImages = [];
    libclass: any;
    importContacts=[]

    constructor( private _snackBar: MatSnackBar,public dialog: MatDialog,private http: HttpClient,private sevice:CorrectionserviceService, private excelSrv:ExcelService){}
  
 

    ngOnInit(){
      var idens = localStorage.getItem('id') as any as number
        this.sevice.getexamenbyProf(idens).subscribe( res => {
          
           this.arrayexam=res
            for(let i =0;i<res.length;i++){
           this.sevice.getmodule(res[i].idmodule).subscribe( res1 => {
           // console.log(res1); 
          this.arraymod=res1;
         
           })
           this.sevice.getclass(res[i].idclass).subscribe( res2 => {
           // console.log(res2); 
          this.arrayclass=res2;
         
           })}

           
           

          })

        
     
      
}

correct(i:number){
  this.pdfroot="upload5/"+this.arrayexam[i].idex+""+this.arrayexam[i].matiere
  console.log(this.pdfroot)
  const dialogRef = this.dialog.open(MyDialogComponent, {

    data: {pdfroot: this.pdfroot },
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(MyDialogComponent.name);
    console.log(this.pdfroot)
   
    
  });
 




    }

    selectImage(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.images = file;
        }
      }

      onSubmit(examen){

console.log(examen)
console.log(examen.idex)
this.targetpro=examen.idex+examen.matiere ;
console.log(this.targetpro)
this.sevice.getclass(examen.idclass).subscribe( res2 => {
    // console.log(res2); 
  // this.libclass=res2[0].pseudoclass;
  this.libclass="4sim4";
  console.log(this.libclass)
    })
        const formData = new FormData();
      //  this.images.size=this.libclass;
        formData.append('upload', this.images ,this.targetpro);
    
        this.http.post<any>('http://localhost:3001/upload2?id=4sim4',  formData).subscribe(
          (res) => console.log(res)
            
          ,
          
          (err) => console.log(err)
        );


      }




      addItem(i:number){
        this.pdfroot="upload4/"+this.arrayexam[i].idex+""+this.arrayexam[i].matiere
        console.log(this.pdfroot)
        const dialogRef = this.dialog.open(MyDialogComponent, {

          data: {pdfroot: this.pdfroot },
          
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(MyDialogComponent.name);
          console.log(this.pdfroot)
         
          
        });
       


      }
      openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
      }


      /*openDialog(): void {

        const dialogRef = this.dialog.open(MyDialogComponent, {
          data: {pdfroot:this.targetpro},
          
        

        });*/
    
      

      //}
     
      
      
}

