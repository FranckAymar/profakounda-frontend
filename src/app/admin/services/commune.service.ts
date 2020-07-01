import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/API_url/config';
@Injectable()
export class CommuneService{

    constructor(private httpClient:HttpClient){}
    listCommunes(){
        return this.httpClient.get(URL.listCommunes);
    }
    saveCommune(data){
        return this.httpClient.post(URL.enregistrerCommune,data);
    }
    listCommunesParVille(data:string){
        return this.httpClient.post(URL.communeParVille,data);
    }
}