import { publicCibleModel } from './../../home/models/publiccible';
import { URL } from 'src/app/API_url/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursCommunService {

  constructor(private http: HttpClient) { 

  }


  fetchCoursCommunForHome():Observable<any>{

    return this.http.get(URL.recupererCoursCommunHome);

  }


  fetchDetailsCoursCommunForHome(id?) :Observable<any> {

      return  this.http.get(URL.recupererCoursCommunForHomeParId + "/" + id);


  }

  fetchCoursCommun(id?) :Observable<any> {

    if(id){
      return  this.http.get(URL.recupererCoursCommunParId + "/" + id);

    }
      return  this.http.get(URL.recupererCoursCommun);

  }

  saveCoursCommun(coursCommum) :Observable<any>{

    if(coursCommum.id){

      return this.http.post(URL.modifierCoursCommun, coursCommum) ;
      
    }

    return this.http.post(URL.enregistrerCoursCommun, coursCommum) ;

  }


  modifierCoutGeneral(coutModel) :Observable<any>{

    return this.http.post(URL.modifierCoutGeneral, coutModel);

  }

  savePublicVise(publicCibles) :Observable<any>{

    if(publicCibles.publicCible[0].id){
      return this.http.post(URL.modifierPublicCible, publicCibles) ;

    }

    return this.http.post(URL.enregistrerPublicCible, publicCibles) ;

  }

  saveLieuIntervention(lieuIntervention) :Observable<any>{

    if(lieuIntervention.id){

      return this.http.post(URL.modifierLieuIntervention, lieuIntervention) ;

    }

    return this.http.post(URL.enregisterLieuIntervention, lieuIntervention) ;

  }

  demandeMiseEnLigne(idPrposition) : Observable<any> {
    return this.http.post(URL.demandeMiseEnligneCourCommun,idPrposition);
}


  rechercherParCode(code) : Observable<any>{
  
    if(code==undefined){ 
      
      return this.http.get(URL.recupererCoursCommunHome);

    }

      return  this.http.get(URL.coursCommunsParCode + "/" +code);
    
    
  }

  rechercherParOrganisation(organisationName): Observable<any> {
 
    if(organisationName===""){ 
      return this.http.get(URL.recupererCoursCommunHome);

    }
    else{
        return  this.http.get(URL.coursCommunsParOrganisation + "/" +organisationName);
    }
  }

  fectchCoursCommunSelect(): Observable<any> {
    return this.http.get(URL.recupererCoursCommunsInscritsParticulier);
   }

   fermerInscriptionCoursCommun(id){
    
    return this.http.post(URL.fermerInscriptionCoursCommun, id);

   }

   fermerInscriptionPublicCible(id){

    return this.http.post(URL.fermerInscriptionPublicCible, id);


   }

  fetchOrganisationList(): Observable<any> {
    return this.http.get(URL.recupererOrganisation);
   }




}

