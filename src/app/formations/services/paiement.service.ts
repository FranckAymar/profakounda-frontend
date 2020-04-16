import { Observable } from 'rxjs';
import { URL } from './../../API_url/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private httpClient : HttpClient) { }

  processToPayment(detailsPayment : any) : Observable<any> {

    return this.httpClient.post(URL.processToPayment , detailsPayment ) ;

  }

}
