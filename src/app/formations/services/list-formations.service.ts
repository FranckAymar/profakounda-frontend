import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListFormationsService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getListPropositionFormations(page?, numberDataOfPage?): Observable<any> {

    let params = new HttpParams().set("page", page).set("total", numberDataOfPage);
    if (page && numberDataOfPage) {
      return this.httpClient.get(URL.listPropositionFormations, { params: params });
    }

    return this.httpClient.get(URL.listPropositionFormations);
  }


  getFilterFormation(filtre): Observable<any> {

    return this.httpClient.get(URL.FilterPropositionFormation + "/" + filtre);

  }

}
