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
}
