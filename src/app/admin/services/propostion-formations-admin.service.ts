import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropostionFormationsAdminService {

  constructor(private httpClient: HttpClient) { }


  fetchProposition(critereFiltre?): Observable<any> {

    if (critereFiltre) {
      let params = new HttpParams().set("critereFiltre", critereFiltre);
      return this.httpClient.get(URL.recupererAllPropostionFormation, { params: params });

    }

    return this.httpClient.get(URL.recupererAllPropostionFormation);

  }


  mettreEnLigne(idProposition): Observable<any> {
    return this.httpClient.post(URL.mettreEnLigne, idProposition);
  }

  refuserMiseEnLigne(idProposition, idCause): Observable<any> {
    let params = new HttpParams().set("idProposition", idProposition).set("idCause", idCause);
    return this.httpClient.post(URL.refuserMiseEnLigne, { params: params })
  }

}
