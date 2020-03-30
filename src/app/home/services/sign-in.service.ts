import { Observable } from 'rxjs';
import { URL } from 'src/app/API_url/config';
import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    TOKEN = 'TOKEN';
    USERNAME = 'USERNAME';
    AUHORITY = 'AUTHORITY';

    constructor(private http: HttpClient ) { }


    login(token) : Observable<any>{

        const headers = new HttpHeaders({'Authorization': `Basic ${token}`})
        return this.http.get(URL.login,{headers}) ;

    }



    logout() {

        sessionStorage.removeItem(this.TOKEN);
        sessionStorage.removeItem(this.USERNAME);
        sessionStorage.removeItem(this.AUHORITY);
    }


    isLogged() {

        let token = sessionStorage.getItem(this.TOKEN)

        if (token === null) {
            return false
        }
        return true

    }
}
