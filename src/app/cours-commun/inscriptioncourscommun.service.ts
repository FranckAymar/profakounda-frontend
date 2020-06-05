import { Observable } from 'rxjs';
import { URL } from 'src/app/API_url/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscriptioncourscommunService {

  constructor(private http : HttpClient) { }


  saveInscritsCoursCommun(data) : Observable<any>{

    return this.http.post(URL.inscriptioncourscommun, data);
  
  }

  saveInscritsPublicCible(data) : Observable<any>{

    return this.http.post(URL.inscriptionpubliccible, data);
  
  
  }
  getDashBoardInscrits() : Observable<any>{

    return this.http.get(URL.getDashBoardInscritsCoursCommuns);
  
  
  }

  recupererInscrit(data : {idPublicCible : number, idCoursCommun : number}) : Observable<any> {

    if(data.idPublicCible){

      return this.http.get(URL.recupererInscrit + "/" + data.idCoursCommun + "/" + data.idPublicCible);

    }

    return this.http.get(URL.recupererInscrit + "/" + data.idCoursCommun);

  }

  verifiedLastInscription(idCoursCommun){

    return this.http.get(URL.verifiedLastInscription +"/"+ idCoursCommun);

  }

}
