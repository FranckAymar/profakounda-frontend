import { URL } from 'src/app/API_url/config';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ParticulierService {


    constructor(private httpClient: HttpClient) { }
    saveParticulier(data) {
        return this.httpClient.post(URL.enregistrerParticulier, data);
    }
    onChangePassword(data) {
        return this.httpClient.post(URL.changePassword, data);
    }

    modifierParticulier(formData) {
        return this.httpClient.post(URL.modifierParticulier, formData);
    }
    modifierPhoto(formData: FormData) {
        return this.httpClient.post(URL.modifierPhoto, formData);
    }
    rechercherParticulier(username: String) {
        return this.httpClient.post(URL.rechercherParticulier, username);
    }
    getCodeParticilier(username: String) {
        return this.httpClient.post(URL.getCode, username);
    }
    getPhoto(id: number) {
        return this.httpClient.post(URL.getPhoto, id);
    }
    revoyerEmail(mail: String) {
        return this.httpClient.post(URL.reSendEmail,mail);
    }

    getAllCustomers(page, numberDataOfPage): Observable<any> {
        let params = new HttpParams().set("page", page).set("total", numberDataOfPage) ;
        return this.httpClient.get(URL.getParticuliers, { params: params });
    }


}