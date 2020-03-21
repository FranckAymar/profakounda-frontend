import { URL } from './../API_url/config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(private httpClient : HttpClient) { }


fetchCycles() : Observable<any>   {

  return this.httpClient.get(URL.recupererCycle);

  
}
}
