import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/API_url/config';

@Injectable()
export class JourService{
    constructor(private httpClient:HttpClient){

    }
    enregistrerJour(data){
        return this.httpClient.post(URL.enregistrerJour,data);
     }
    modifierJour(data){
        return this.httpClient.post(URL.modifierJour,data);
     }
     supprimerJour(id:number){
        return this.httpClient.post(URL.supprimerJour,id);
     }
     onFetchJours(){
        return this.httpClient.get(URL.onFetchJours);
     }
     onFetchJoursString(){
      return this.httpClient.get(URL.onFetchJoursString);
   }
     rechercherJour(id:number){
        return this.httpClient.post(URL.rechercherJour,id);
     }
}