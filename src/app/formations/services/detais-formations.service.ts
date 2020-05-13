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
  getDetailParticulierParFormation(idPropositionFormation) : Observable<any> {

    alert("okkk connecter"+idPropositionFormation);

    return this.httpClient.get(URL.getContactParticulier + "/"+ idPropositionFormation ) ;


  }

}
