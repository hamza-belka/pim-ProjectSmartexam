import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CorrectionserviceService {
  
  generaladresse:string="http://localhost:3001";

  constructor(private http: HttpClient) { 
  }

  getexamenbyProf(idens:number):Observable<any>
    {
    
   return   this.http.get<any[]>(this.generaladresse+"/getexamen2/"+idens)
   .pipe(
   
   
  
  )}
  getAllmodule():Observable<any>
    {
    
   return   this.http.get<any[]>(this.generaladresse+"/getmodule")
   .pipe(
   
   
  
  )}
  getmodule(idmod:number):Observable<any>
    {
    
   return   this.http.get<any[]>(this.generaladresse+"/getmodule2/"+idmod)
   .pipe(
   
   
  
  )}
  getclass(idmod:number):Observable<any>
    {
    
   return   this.http.get<any[]>(this.generaladresse+"/getclass2/"+idmod)
   .pipe(
   
   
  
  )}
}
