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

    let params = new HttpParams().set("page", page).set("total", numberDataOfPage);
    if (page && numberDataOfPage) {
      return this.httpClient.get(URL.listPropositionFormationsEnligne, { params: params });
    }
    return this.httpClient.get(URL.listPropositionFormationsEnligne);
  }

  
getFilterFormation(filtre,designationVille) : Observable<any> {

    if(filtre==undefined){
      return this.httpClient.get(URL.listPropositionFormationsEnligne);
    }
    else if(filtre===""){
      filtre="undefined";
        if(designationVille==="Toutes"){
          return this.httpClient.get(URL.listPropositionFormationsEnligne);
        }
        else return this.httpClient.get(URL.filterDeFormationParVille+"/"+designationVille+"/"+ filtre);
    }
    else if(filtre===" "){
      
      return this.httpClient.get(URL.listPropositionFormationsEnligne);
    }
    else{
      return this.httpClient.get(URL.FilterPropositionFormation+ "/"+ filtre+"/"+designationVille) ;
    }
  }
  getFiterDeFormationParVille(designationVille,filtre) : Observable<any> {

    if(designationVille==="Toutes"&&(filtre==undefined||filtre==="")){
      
      return this.httpClient.get(URL.listPropositionFormationsEnligne); 
    }
    else if (filtre===""){
       filtre="undefined";
       return this.httpClient.get(URL.filterDeFormationParVille+"/"+designationVille+"/"+ filtre);
    }
    else{
      return this.httpClient.get(URL.filterDeFormationParVille+"/"+designationVille+"/"+ filtre);
    }
    }
}


