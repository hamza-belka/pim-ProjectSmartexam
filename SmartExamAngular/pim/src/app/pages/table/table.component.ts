import { Component, OnInit, Inject } from '@angular/core';
import { UserServiceService } from 'app/user-service.service';
import { Router, Data } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})



export class TableComponent implements OnInit{
    constructor(private service:UserServiceService,private router : Router,public dialog: MatDialog){}
    userarray:any[]
    selectedValue : string ;
    searchText : string

    ngOnInit(){
       this.selectedValue=  "etudiant"
       this.getlist()
    }
    openDialog(i:number): void {
      
        const dialogRef = this.dialog.open(deletepopup, {
          data: {object: this.userarray[i],
          role: this.selectedValue }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
      getlist(){
if(this.selectedValue=="etudiant"){
this.service.getAllSt() .subscribe(heroes => {this.userarray=heroes
  console.log(this.userarray)}
      );

}else{this.service.getAllT() .subscribe(heroes => {this.userarray=heroes
  console.log(this.userarray)}
      );

}



      }
    
    
    

}

@Component({
    selector: 'deletepopup',
    templateUrl: 'deletepopup.html',
  })
  export class deletepopup {

    
  
    constructor(private service:UserServiceService,private router : Router,
      public dialogRef: MatDialogRef<deletepopup>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
        username = this.data.object.name
        role = this.data.object.role
        deluser(){
          if(this.role== "etudiant"){
            this.service.deletest(this.data.object.id).subscribe(res=>
              {console.log(res)
             // location.reload();
            });
            }else{
              this.service.deletet(this.data.object.id).subscribe(res=>location.reload()) 
        }}

    onNoClick(): void {
      this.dialogRef.close();
    }
  }  
