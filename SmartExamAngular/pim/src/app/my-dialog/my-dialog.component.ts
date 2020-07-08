import { Component, OnInit, Inject } from '@angular/core';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserServiceService } from 'app/user-service.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {
  username: string;
  password:string;
  err:string
  name: string;
  pdfSrc:string;
  constructor( public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service:UserServiceService) { }

 ngOnInit() {
   console.log(this.data.pdfroot)
    this.pdfSrc = "http://127.0.0.1:3001/"+this.data.pdfroot;
     this.err=""
   }
   welcome(): void {
     
     if(this.username!=null){
       this.service.login(this.username, this.password).subscribe( res => {
         console.log(res)
         if(res.email!=null){
           localStorage.setItem('username',res.name)
           //localStorage.setItem('role',res.user.role)
           localStorage.setItem('role',"enseignant")
           localStorage.setItem('id',res.id)
           localStorage.setItem('email',res.email)
 
           location.reload()
       this.dialogRef.close("welcome "+this.username)}else{this.err="invalid credentials"}})
       
    
     }
   
   
 
 }}
