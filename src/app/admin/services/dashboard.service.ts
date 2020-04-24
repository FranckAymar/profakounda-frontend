import { Observable } from 'rxjs';
import { URL } from 'src/app/API_url/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(

    private  httpClient : HttpClient

  ) { }



  fetchDetailsDashboard() : Observable <any>{
    return this.httpClient.get(URL.recupererDashBoard)
  }
}
