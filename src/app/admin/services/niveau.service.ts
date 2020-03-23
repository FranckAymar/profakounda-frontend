import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../API_url/config';
import { Niveau } from '../model/niveau.model';

@Injectable()
export class NiveauService{

    constructor(private httpClient: HttpClient){}
    fetchNiveaux() : Observable<any>   {
        return this.httpClient.get(URL.recupererNiveau);
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