import { Filiere } from './../model/filiere';
import { URL } from './../API_url/config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  constructor(private httpClient : HttpClient) { }


fetchFilieres() : Observable<any>   {

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

