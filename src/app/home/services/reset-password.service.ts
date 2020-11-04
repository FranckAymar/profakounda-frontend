import { PasswordResetModel } from './../models/password-reset';
import { URL } from 'src/app/API_url/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient : HttpClient) { }


  requestToResetPassword( username : string ) : Observable<any> {

    return this.httpClient.post(URL.forgotPassword, username) ;

  }
  
  requestToVerifyResetPassword(token : string ) : Observable<any> {

    return this.httpClient.get(URL.resetPassword + "/" + token) ;

  }

  resetPassword(passwordReset : PasswordResetModel ,token : string) : Observable<any> {

    
    return this.httpClient.post(URL.resetPassword + "/" + token, passwordReset ) ;


  }

}
