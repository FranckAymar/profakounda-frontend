import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursCommunAdminService {

  constructor(private httpClient: HttpClient) { }


  fetchCoursCommun(): Observable<any> {

    return this.httpClient.get(URL.listeCoursCommuns);

  }
  fetchCoursComptabilite(): Observable<any> {

    return this.httpClient.get(URL.comptabiliteCoursCommun);

  }
  fetchCoursComptabiliteByOrganisation(idOrganisation:Number): Observable<any> {

    return this.httpClient.post(URL.comptabiliteParOrganisation,idOrganisation);

  }

  fetchAllcoursCommunAdmin(critereFiltre?): Observable<any> {

    if (critereFiltre) {
      let params = new HttpParams().set("critereFiltre", critereFiltre);
      return this.httpClient.get(URL.allCoursCommunAdmin, { params: params });

    }

    return this.httpClient.get(URL.allCoursCommunAdmin);

  }


  supprimerMiseEnLigne(id:number){

    return this.httpClient.post(URL.supprimerMiseEnligneCourCommun,id);
 }
  mettreEnLigne(idProposition): Observable<any> {
    return this.httpClient.post(URL.accepterMiseEnligneCourCommun, idProposition);
  }

  refuserMiseEnLigne(idProposition, idCause): Observable<any> {
    let params = new HttpParams().set("idProposition", idProposition).set("idCause", idCause);
    return this.httpClient.post(URL.refuserMiseEnLigneCourCommun, null,{ params: params });
  }

  fetchCoursCommunParId(idCours): Observable<any> {
    
    return this.httpClient.get(URL.detailsCoursCommunAdmin+ "/"+ idCours );

  }

  }
