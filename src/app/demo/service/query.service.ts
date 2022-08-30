import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {evenement, evenement2} from "../api/evenement";
import {utilisateur} from "../api/utilisateur";
import {Observable} from "rxjs";
import {Logparticipation} from "../logparticipation";
const uri = "http://localhost:8080/operation"
@Injectable({
  providedIn: 'root'
})

export class QueryService {

  constructor(private http:HttpClient) { }

    //TODO :  add all Project Methods here
    public  login(mail:string,password:string){
         const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(mail + ':' + password) });
          return this.http.get<any>(uri+'/login',{headers})
    }
    getAllusers(){
      return this.http.get<any[]>(uri+'/getAllusers')
    }
    getAllEvents(){
      return  this.http.get<any[]>(uri+'/getAllEvents')
    }
    getAllAssociations(){
      return this.http.get<any[]>(uri+'/getAllAssociations')

    }
    getAllConventions(){
      return this.http.get<any[]>(uri+'/getAllConventions')

    }

    addUser(u:utilisateur):Observable<utilisateur>{
      return this.http.post<utilisateur>(uri+'/addUser',u)
    }
    uploadfile(file:File):Observable<HttpEvent<any>>{
      const formData : FormData = new FormData();
        formData.append('file',file);
        const req = new HttpRequest('POST',uri+'/uploadfile',formData,{
            reportProgress:true,
            responseType:'json'
        });
        return this.http.request(req)
    }
    uploadEventFile(file:File):Observable<HttpEvent<any>>{
        const formData : FormData = new FormData();
        formData.append('file',file);
        const req = new HttpRequest('POST',uri+'/loadEventFile',formData,{
            reportProgress:true,
            responseType:'json'
        });
        return this.http.request(req)
    }
    deleteUser(cin:string):Observable<utilisateur>{
      console.log("DELETE USER"+cin)
      let opts : {params:HttpParams};
        opts = {params:new HttpParams({fromString:'cin='+cin})}
        return this.http.get<utilisateur>(uri+'/deleteUserByCin',opts)
    }
    addevent(e:evenement2):Observable<any>{
      return this.http.post<evenement2>(uri+'/addEvent',e)
    }
    addDetailEvent(de:any):Observable<any>{
      return this.http.post<any>(uri+'/addDetailEvent',de)
    }
    addLogParticipation(lp:Logparticipation,places:number):Observable<any>{
      let opts: {params:HttpParams};
      opts = {params:new HttpParams({fromString:'places='+places})}
        return this.http.post<any>(uri+'/participate',lp,opts)
    }



}
