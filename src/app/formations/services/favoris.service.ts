import { Observable } from 'rxjs';
import { URL } from './../../API_url/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor(private http : HttpClient) { }


  addFavoris(favorisModel) : Observable<any>{

    return  this.http.post(URL.ajouterFavoris, favorisModel) ;

  }

  recupererFavoris() :  Observable<any>{
    
    return this.http.get(URL.recupererFavoris) ;

  }

  supprimerFavoris(favorisModel) :  Observable<any> {
    return this.http.post(URL.supprimerFavoris, favorisModel) ;
  }

}
