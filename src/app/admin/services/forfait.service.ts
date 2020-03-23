import { Forfait } from '../model/forfait';
import { URL } from '../../API_url/config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForfaitService {

  constructor(private httpClient : HttpClient) { }


  fetchForfait() : Observable<any> {

    return this.httpClient.get(URL.recupererForfaits) ;

  }


   saveForfait(forfait : Forfait) : Observable<any> {

    //Nouvelle enregistrement

    if(forfait.id === null) {
      return this.httpClient.post(URL.enregistrerForfait, forfait) ;

    }
    //Modification
    else {
      return this.httpClient.post(URL.modifierForfait, forfait) ;

    }

  }


 

  supprimerForfait(id : number) : Observable<any> {

    return this.httpClient.post(URL.supprimerForfait, id) ;

  }



}
