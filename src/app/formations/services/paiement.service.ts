import { Observable } from 'rxjs';
import { URL } from './../../API_url/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private httpClient : HttpClient) { }

  processToPayment(detailsPayment : any) : Observable<any> {

    return this.httpClient.post(URL.processToPayment , detailsPayment ) ;

  }

  getPaymentParticulier(username) : Observable<any>  {

    return this.httpClient.post(URL.getPaymentParticulier, username) ;
  }


  getAllPayments(page, numberDataOfPage)  : Observable<any>{
    
    let params = new HttpParams().set("page", page).set("total", numberDataOfPage) ;
    return this.httpClient.get(URL.getPayments, {params : params});
  }


}
