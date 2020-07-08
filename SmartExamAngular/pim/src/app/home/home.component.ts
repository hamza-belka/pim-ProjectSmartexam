import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'app/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stmail : string;
  stpass : string;
  tmail :string;
  tpass : string;
  admin:boolean

  constructor(private service : UserServiceService,private router : Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  loginet(): void {
    
    if(this.stmail!=null){
      this.loginad(this.stmail,this.stpass)
      
      if(this.admin==true){
        

        this.router.navigate(['admin'])
      }
      else{
      this.service.loginst(this.stmail, this.stpass).subscribe( res => {
        console.log(res)
        if(res.email!=null){
          localStorage.setItem('username',res.name)
          //localStorage.setItem('role',res.user.role)
          localStorage.setItem('role',"etudiant")
          localStorage.setItem('id',res.id)
          localStorage.setItem('email',res.email)
          localStorage.setItem('adresse',res.adresse)
          localStorage.setItem('numtel',res.numtel)
          localStorage.setItem('password',this.stpass)
          this.router.navigate(['admin'])
        }
        else{
          this.openSnackBar(
            "the email or password is incorrect, if you are a teacher please make sure to sign in into the teacher tab","Close")
        }
      
      }
      );
      }
    }

      
}
loginens(): void {
    
  if(this.tmail!=null){
    
      this.loginad(this.tmail,this.tpass)
      
      if(this.admin==true){
        

        this.router.navigate(['admin'])
      }
    else{
    this.service.login(this.tmail, this.tpass).subscribe( res => {
      console.log(res)
      if(res.email!=null){
        localStorage.setItem('username',res.name)
        //localStorage.setItem('role',res.user.role)
        localStorage.setItem('role',"enseignant")
        localStorage.setItem('id',res.id)
        localStorage.setItem('email',res.email)
        localStorage.setItem('adresse',res.adresse)
        localStorage.setItem('numtel',res.numtel)
        localStorage.setItem('password',this.tpass)
        this.router.navigate(['admin'])
      }
      else{
        this.openSnackBar(
          "the email or password is incorrect, if you are a student please make sure to sign-in into the student tab","Close")
      }
    });}}
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 10000,
  });
}
loginad(mail:string, password:string){
  this.service.loginA(mail, password).subscribe( res => {
    
    ///console.log(res)
if(res.email!=null){
  localStorage.setItem('username',mail)
  localStorage.setItem('role',"admin")
  localStorage.setItem('password',password)
  this.admin = true;

}else {
  this.admin =false;
}

});
}
}
    
