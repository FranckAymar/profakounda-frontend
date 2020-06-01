import { PasswordResetModel } from '../models/password-reset';
import { URL } from 'src/app/API_url/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class signUpvalidationService {

  constructor(private httpClient : HttpClient) { }
  
  requestToSignUpValidation(token : string ) : Observable<any> {

    return this.httpClient.get(URL.singUpValidation + "/" + token) ;

  }

}
