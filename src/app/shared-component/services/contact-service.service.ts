import { Observable } from 'rxjs';
import { URL } from 'src/app/API_url/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http : HttpClient) { }


  sendMessage(data) : Observable<any>{

    return this.http.post(URL.sendMessageContactUs, data);
  }
}
