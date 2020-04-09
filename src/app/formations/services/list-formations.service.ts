import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListFormationsService {

  constructor(
            private httpClient : HttpClient
  ) { }


  getListPropositionFormations() : Observable<any> {

    return this.httpClient.get(URL.listPropositionFormations);
  }



}
