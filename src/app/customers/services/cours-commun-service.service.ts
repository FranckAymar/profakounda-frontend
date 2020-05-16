import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursCommunService {

  constructor(private http: HttpClient) { 

  }


  fetchCoursCommun() :Observable<any> {

   return  this.http.get(URL.recupererCoursCommun);

  }

  saveCoursCommun(coursCommum) :Observable<any>{

    return this.http.post(URL.enregistrerCoursCommun, coursCommum) ;

  }

  modifierCoutGeneral(coutModel) :Observable<any>{

    return this.http.post(URL.modifierCoutGeneral, coutModel);

  }

  savePublicVise(publicCible) :Observable<any>{

    return this.http.post(URL.enregistrerPublicCible, publicCible) ;

  }

  saveLieuIntervention(lieuIntervention) :Observable<any>{

    return this.http.post(URL.enregisterLieuIntervention, lieuIntervention) ;

  }
}
