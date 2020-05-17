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

    return this.httpClient.get(URL.recupererCoursCommun);

  }

  }
