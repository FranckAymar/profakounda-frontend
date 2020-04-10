import { URL } from 'src/app/API_url/config';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ParticulierService{

    
    constructor(private httpClient:HttpClient){}
    saveParticulier(data){
       return this.httpClient.post(URL.enregistrerParticulier,data);
    }
    onChangePassword(data){
        return this.httpClient.post(URL.changePassword,data);
     }

    modifierParticulier(formData:FormData){
        return this.httpClient.post(URL.modifierParticulier,formData);
    }
    rechercherParticulier(username:String){
        return this.httpClient.post(URL.rechercherParticulier,username);
    }
    getPhoto(id:number){
        return this.httpClient.post(URL.getPhoto,id);
    }

    
}