import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/API_url/config';
@Injectable({
    providedIn: 'root'
})
export class AvisService{
    constructor(private http: HttpClient ) { }

    enregistrerAvis(data){
        return this.http.post(URL.enregistrerAvis,data) ;
    }

}