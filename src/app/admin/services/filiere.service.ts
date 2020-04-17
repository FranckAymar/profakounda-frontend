import { Filiere } from '../model/filiere';
import { URL } from '../../API_url/config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  constructor(private httpClient : HttpClient) { }


fetchFilieres(page?, numberDataOfPage?) : Observable<any>   {

  let params = new HttpParams().set("page", page).set("total", numberDataOfPage) ;
  if(page && numberDataOfPage){
    return this.httpClient.get(URL.recupererFiliere, {params : params});

  }
    return this.httpClient.get(URL.recupererFiliere);

}
// enregistrement
enregistrerFiliere(filiere : Filiere): Observable<any> {

  return this.httpClient.post(URL.enregistrerFiliere, filiere);
  
    }
//modification
modifierFiliere(filiere : Filiere): Observable<any> {

      return this.httpClient.post(URL.modifierFiliere, filiere);
    }
 // suppression
supprimerFiliere(filiere: Filiere): Observable<any> {

      return this.httpClient.post(URL.supprimerFiliere,filiere);
    }    

}

