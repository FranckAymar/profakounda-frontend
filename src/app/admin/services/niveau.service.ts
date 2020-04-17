import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../API_url/config';
import { Niveau } from '../model/niveau.model';

@Injectable()
export class NiveauService{

    constructor(private httpClient: HttpClient){}



    fetchNiveaux(page?, numberDataOfPage?) : Observable<any>   {
        let params = new HttpParams().set("page", page).set("total", numberDataOfPage) ;
        if(page && numberDataOfPage){
          return this.httpClient.get(URL.recupererNiveau, {params : params});
        }else {
          return this.httpClient.get(URL.recupererNiveau);

        }
      }
      fetchNiveauxString() : Observable<any>   {
        return this.httpClient.get(URL.onFetchNiveauString);
      }
      
      onSaveNiveau(niveau:Niveau){
       return this.httpClient.post(URL.enregistrerNiveau,niveau);
      }
      
      onDeleteNiveau(niveau:Niveau){
        return this.httpClient.post(URL.supprimerNiveau,niveau);
      }
      
      getNiveau(niveau:Niveau){
        return this.httpClient.post(URL.retrouverNiveauParId,niveau);
      }
      updateNiveau(niveau:Niveau){
        return this.httpClient.post(URL.modifierNiveau,niveau);
      }
}