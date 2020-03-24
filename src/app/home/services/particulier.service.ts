import { URL } from 'src/app/API_url/config';
import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';

@Injectable()
export class ParticulierService{
    constructor(private httpClient:HttpClient){}
    saveParticulier(data){
       return this.httpClient.post(URL.enregistrerParticulier,data);
    }
}