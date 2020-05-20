import { UserModel } from './../models/UserModel';
import { Observable } from 'rxjs';
import { URL } from 'src/app/API_url/config';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    TOKEN = 'TOKEN';
    USERNAME = 'USERNAME';
    AUHORITY = 'AUTHORITY';

    constructor(private http: HttpClient ) { }


    authorities = [
        {
            authority: ''
        }
    ]


    authority: string;

    message: string = '';


    login(user : UserModel) : Observable<any>{

        return this.http.post(URL.login, user) ;

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
