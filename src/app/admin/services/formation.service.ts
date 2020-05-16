import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/API_url/config';
import { Injectable } from '@angular/core';

@Injectable()
export class FormationService{
    constructor(private httpClient:HttpClient){}
    enregistrerFormation(data){
        return this.httpClient.post(URL.enregistrerFormation,data);
     }
    modifierFormation(data){
        return this.httpClient.post(URL.modifierFormation,data);
     }
     supprimerFormation(id:number){
      return this.httpClient.post(URL.supprimerFormation,id);
   }
     onFetchFormations() : Observable <any>{
        return this.httpClient.get(URL.onFetchFormations);
     }
     onFetchFormationsString(){
      return this.httpClient.get(URL.onFetchFormationsString);
   }
    
}