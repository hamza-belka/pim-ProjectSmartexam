import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'app/user-service.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    role : string
    usrnm : string
    email : string
    fname : string
    lname : string
    adresse:string
    numtel:string
    oldPassword : string
    newPassword : string
    oldpw:string
    id : number
    confirmPassword:string

    constructor(private service:UserServiceService, private _snackBar: MatSnackBar, private router : Router){}

    ngOnInit(){

    this.id = localStorage.getItem('id') as unknown as number

    this.role = localStorage.getItem('role')
    this.usrnm = localStorage.getItem('username')
    this.email = localStorage.getItem('email')
    this.fname = localStorage.getItem('adresse')
    this.lname = localStorage.getItem('numtel')
    
    this.oldpw=localStorage.getItem('password')
    }

    changepassword(){

        if((this.oldPassword == this.oldpw)&&(this.confirmPassword==this.newPassword) ){
            localStorage.setItem('password',this.newPassword)
if(this.role="etudiant"){
        this.service.updateSt(this.id,this.adresse,this.numtel,this.newPassword).subscribe(res => {
            console.log(res)


            
        })}
        if(this.role="enseignant"){
            this.service.updateT(this.id,this.adresse,this.numtel,this.newPassword).subscribe(res => {
                console.log(res)
            })
    
            
        }
        if(this.role="admin"){
            /*this.service.updateT(this.id,this.adresse,this.numtel,this.newPassword).subscribe(res => {
                console.log(res)
            })*/
    
            
        }
        
        
        this.openSnackBar("profile updated","Close")
        this.router.navigate(['/dashboard'])
    }else{
        this.openSnackBar("please check your passwords","Close")

    }
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
      }
}
