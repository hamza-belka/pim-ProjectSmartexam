import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { EmailValidator } from '@angular/forms';
import { resetFakeAsyncZone } from '@angular/core/testing';
;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {adresse:String="/auth/"
adduser:String="/user/"
generaladresse:string="http://localhost:3001"



constructor(private http: HttpClient) { }

// getAll():Produit[]
// {
//   return this.prods;
// }
/*login(usermail:string, password:string): Observable<any>{

    
  return this.http.post(this.adresse+"login", { username: usermail,
    password: password }).pipe(map(result => {
    const user =result
 
    
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      
      console.log(user);
    }
    return user;
  }));
//login1(usermail:string, password:string){
  /*return new Promise((resolve,reject)=>
  {
    this.http.post<any>(this.adresse+"auth/login", { username: usermail,
    password: password },{
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).subscribe(data => {
      console.log(data)
      
  })
});*/
/*const headers = { 'Access-Control-Allow-Origin': "http://localhost" , 'My-Custom-Header': 'Access-Control-Allow-Origin' }
this.http.post(this.adresse+"auth/login", { username: usermail,
password: password },{ headers }).toPromise().then((data:any)=>{
console.log(data.json)

})

}*/


newST(name:string, email:string, adress:string, phone:string, password:string, idclass: number): Observable<any>{

    
  return this.http.post(this.generaladresse+"/registerst", { name: name, email: email, adresse:adress,numtel:phone, salt:"10",
    password: password, idclass:idclass }).pipe(map(result => {
    const user =result


    
 
  }));
}
generateXam(nb:number,matiere:string,idens:number,idmodule:number,idclass:number,cn:string){

  return this.http.post(this.generaladresse+"/newprojet", { nb: nb,matiere:matiere,idens:idens,idclass:idclass,idmodule:idmodule,cn:cn}).pipe(

);

}
updateSt(id:number, adress:string, phone:string, password:string){

    
  return this.http.post(this.generaladresse+"/updateprofilest", {id:id, adresse:adress,numtel:phone, 
    password: password }).pipe(map(result => {
    console.log(result)


    
 
  }));
}
updateT(id:number, adress:string, phone:string, password:string){

    
  return this.http.post(this.generaladresse+"/updateprofileT", {id:id, adresse:adress,numtel:phone, 
    password: password }).pipe(map(result => {
    console.log(result)


    
 
  }));
}
newT(name:string, email:string, adress:string, phone:string, password:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/register", { name: name, email: email, adresse:adress,numtel:phone, salt:"10",
    password: password }).pipe(map(result => {
    const user =result


    
 
  }));
}
newA(name:string, email:string, adress:string, phone:string, password:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/registerad", { name: name, email: email, adresse:adress,numtel:phone, salt:"10",
    password: password }).pipe(map(result => {
    const user =result


    
 
  }));
}

sendmail(name:string,email:string,password:string){

  return this.http.post(this.generaladresse+"/sm", {name: name, email: email, password: password}).pipe(map(result=>{
    console.log(result)
  }));
}
deletet(id:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/delt", { id: id}).pipe(map(result => {
    const user =result


    
 
  }));
}
deletest(id:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/delst", { id: id}).pipe(map(result => {console.log(result)


    
 
  }));
}
getAllT(): Observable<any[]> {
  return this.http.get<any[]>(this.generaladresse+"/teachers")
    .pipe(
    
    );
  }
getAllSt(): Observable<any[]> {
    return this.http.get<any[]>(this.generaladresse+"/students")
      .pipe(
      
      );
    }



getById(id:number){
return new Promise((resolve,reject)=>
{
  this.http.get(this.adresse+"selectById?id="+id).subscribe(res=>resolve(res) ,err=>reject(err));

});
}

/*addProd(lib:String,prix:number){
return new Promise((resolve,reject)=>
{
   this.http.get(this.adresse+"insert?libelle="+lib+"&prix="+prix).subscribe(res=>resolve(res) ,err=>reject(err));

});
}*/

getByType(type:String){
  return new Promise((resolve,reject)=>
  {
     this.http.get(this.adresse+"selectByType?type="+type).subscribe(res=>resolve(res) ,err=>reject(err));
  
  });
  }

  
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.adduser+"")
      .pipe(
      
      );
    }

    deluser(id:number): Observable<any>{

    
      return this.http.delete(this.adduser+""+id, {  }).pipe(map(result => {
            
    
        
     
      }));
    }

    changepassword(id : number, newPassword : string, oldPassword:string): Observable<any>{

    
      return this.http.post(this.adresse+"change-password", { 
        id : id, oldPassword: oldPassword,newPassword: newPassword }).pipe(map(result => {

                  
      
      }));
    }

login(usermail:string, password:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/login", { email: usermail,
    password: password }).pipe(map(result => {
    const user =result
 
    
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      
      console.log(user);
    }
    return user;
  }));



}

loginA(usermail:string, password:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/loginad", { email: usermail,
    password: password }).pipe(map(result => {
    const user =result
 
    
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      
      console.log(user);
    }
    return user;
  }));



}
loginst(usermail:string, password:string): Observable<any>{

    
  return this.http.post(this.generaladresse+"/loginst", { email: usermail,
    password: password }).pipe(map(result => {
    const user =result
 
    
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      
      console.log(user);
    }
    return user;
  }));



}



}
