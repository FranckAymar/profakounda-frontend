import { Classe } from './../model/classe';
import { URL } from './../API_url/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private httpClient : HttpClient) { }


fetchClasses() : Observable<any>   {

  return this.httpClient.get(URL.recupererClasse);
}
 
}
