import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/API_url/config';
import { Injectable } from '@angular/core';

@Injectable()
export class VilleService{
    constructor(private httpClient:HttpClient){

    }
    onFetchVilles(){
        return this.httpClient.get(URL.recupererVilles);
    }
    onFetchVillesString(){
        return this.httpClient.get(URL.onFetchVillesString);
    }
    enregistrerVille(data){
        return this.httpClient.post(URL.enregistrerVille,data);
    }
    modifierVille(data){
        return this.httpClient.post(URL.modifierVille,data);
    }
    supprimerVille(id:number){
        return this.httpClient.post(URL.supprimerVille,id);
    }

}