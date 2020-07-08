import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
;

@Injectable({
  providedIn: 'root'
})


export class ClassesService {
  adresse = "/class";
  generaladresse:string="http://localhost:3001"



  constructor(private http: HttpClient) { }

  getAllclasses(): Observable<any[]> {
    return this.http.get<any[]>(this.generaladresse+"/Allclasses")
      .pipe(
      
      );
    }
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.generaladresse+"/lvl")
      .pipe(
      
      );
    }

    getClasses(level:string){
      return this.http.post(this.generaladresse+"/class",{ level:level})
      .pipe();
    }



    newClass(name:string, level:string, nbrstd:number): Observable<any>{

    
      return this.http.post(this.adresse+"", { name: name, level: level, nbrstd:nbrstd}).pipe(map(result => {
        const classes =result
    
    
        
     
      }));
    }




}
