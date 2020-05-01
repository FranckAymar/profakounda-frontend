import { SignInService } from './../../home/services/sign-in.service';
import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListFormationsService {

  constructor(
    private httpClient: HttpClient, private signInService : SignInService
  ) { }

  getListPropositionFormations(page?, numberDataOfPage?): Observable<any> {

    let params = new HttpParams().set("page", page).set("total", numberDataOfPage)
                .set("username" , sessionStorage.getItem(this.signInService.USERNAME));
    if (page && numberDataOfPage) {
      return this.httpClient.get(URL.listPropositionFormationsEnligne, { params: params });
    }
    return this.httpClient.get(URL.listPropositionFormationsEnligne);
  }

  
getFilterFormation(filtre) : Observable<any> {

  if(filtre==undefined){
    return this.httpClient.get(URL.listPropositionFormationsEnligne);
  }
    if(filtre===""){
      return this.httpClient.get(URL.listPropositionFormationsEnligne);
    }
    else if(filtre===" "){
      
      return this.httpClient.get(URL.listPropositionFormationsEnligne);
    }
    else{
      return this.httpClient.get(URL.FilterPropositionFormation+ "/"+ filtre) ;
    }
  }

}


