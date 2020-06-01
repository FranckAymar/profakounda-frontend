import { URL } from 'src/app/API_url/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormationMangementeService{
    constructor(private httpClient:HttpClient){

    }
    getListPropositionFormations(page?, numberDataOfPage?): Observable<any> {

        let params = new HttpParams().set("page", page).set("total", numberDataOfPage);
        if (page && numberDataOfPage) {
          return this.httpClient.get(URL.listPropositionFormationsEnligne, { params: params });
        }
    
        return this.httpClient.get(URL.listPropositionFormationsEnligne);
      }
     
    getFilterFormation(filtre) : Observable<any> {
        if(filtre===""){
    
          return this.httpClient.get(URL.listPropositionFormationsEnligne);
        }
        else if(filtre===" "){
          
          return this.httpClient.get(URL.listPropositionFormationsEnligne);
        }
        else{
        return this.httpClient.get(URL.FilterPropositionFormation+ "/"+ filtre) ;
        }
    
      }


    onFetchFormationEnligne(){
        return this.httpClient.get(URL.listPropositionFormationsEnligne);
    }
   
    supprimerMiseEnLigne(id:number){ 

        return this.httpClient.post(URL.supprimerMiseEnligne,id);
    }

}