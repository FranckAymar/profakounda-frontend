import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http : HttpClient) { }


  fetchOrganisations() : Observable<any>{

   return this.http.get(URL.recupererOrganisation) ;
  }


}
