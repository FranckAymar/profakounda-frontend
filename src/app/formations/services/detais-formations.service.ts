import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetaisFormationsService {

  constructor(
            private httpClient : HttpClient
  ) { }


  getDetailFormation(idPropositionFormation) : Observable<any> {

    return this.httpClient.get(URL.detailsPropositionFormation + "/"+ idPropositionFormation) ;

  }
  getDetailParticulierParFormation(idPropositionFormation, username) : Observable<any> {

    let params = new HttpParams().set("username", username) ;
    return this.httpClient.get(URL.getContactParticulier + "/"+ idPropositionFormation , {params : params}) ;


  }

}
