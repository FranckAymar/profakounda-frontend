import { CauseRefusModel } from './../model/causerefusmodel';
import { URL } from './../../API_url/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CauserefusService {

  constructor(private httpClient : HttpClient) { }

  fetchRefus() : Observable<any>   {

    return this.httpClient.get(URL.recupererRefus);
  }

  saveRefus(refus : CauseRefusModel) : Observable<any>   {

    return this.httpClient.post(URL.ajouterRefus, refus);
  }
}
