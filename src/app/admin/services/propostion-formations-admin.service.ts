import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropostionFormationsAdminService {

  constructor(private httpClient : HttpClient) { }

  
  fetchProposition(critereFiltre?) : Observable<any> {

    if(critereFiltre){
      let params  = new HttpParams().set("critereFiltre", critereFiltre);
      return this.httpClient.get(URL.recupererAllPropostionFormation, {params : params}) ;
  
    }

    return this.httpClient.get(URL.recupererAllPropostionFormation) ;


  }
  
}
