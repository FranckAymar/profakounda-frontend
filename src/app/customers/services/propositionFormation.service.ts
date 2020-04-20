import { Observable } from 'rxjs';
import { CoordMapModel } from './../models/CoordModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL } from 'src/app/API_url/config';

export class PropositionFormationService{
    constructor(private httpClient:HttpClient){}
    onSaveNiveauEnseigne(data){
        return this.httpClient.post(URL.enregsitrerNiveauForme,data);
     }
     onSaveModule(data){
        return this.httpClient.post(URL.enregistrerModule,data);
     }
     onUpdateNiveauEnseigne(data){
        return this.httpClient.post(URL.modifierNiveauForme,data);
     }
     onFetchLevelTeach(username:String){
         return this.httpClient.post(URL.rechercherNiveauEnseignes,username);
     }
     getContratById(id:Number){
        return this.httpClient.post(URL.getContrat,id);
    }
    getModuleById(id:Number){
        return this.httpClient.post(URL.getModule,id);
    }
    deleteContratById(id:Number){
        return this.httpClient.post(URL.deleteContrat,id);
    }
    deleteDisponibiliteByDay(data){
        return this.httpClient.post(URL.deleteDisponibiliteByDay,data);
    }
    deleteDisponibiliteByHour(id){
        return this.httpClient.post(URL.deleteDisponibiliteByHour,id);
    }
    deleteModuleById(id:Number){
        return this.httpClient.post(URL.deleteModule,id);
    }
    rechercherDisponibilites(id:Number){
        return this.httpClient.post(URL.rechercherDisponibilites,id);
    }
    demandeMiseEnLigne(id:Number){
        return this.httpClient.post(URL.demandeMiseEnLigne,id);
    }
    rechercherModules(username:String){
        return this.httpClient.post(URL.rechercherModule,username);
    }
    onSaveDisponibilte(data){
        return this.httpClient.post(URL.enregistrerDisponibilte,data);
     }
     onSaveListJourHeure(data){
        return this.httpClient.post(URL.enregistrerListJourHeure,data);
     }
     onUpdateModule(data){
        return this.httpClient.post(URL.modifierModule,data);
     }

     //PROPOSITION
     rechercherProposition(username:String){
        return this.httpClient.post(URL.rechercherPropositions,username);
    }
    getPropositionById(id:Number){
        return this.httpClient.post(URL.getProposition,id);
    }
    enregistrerProposition(data){
        return this.httpClient.post(URL.enregsitrerProposition,data);
     }
     modifierProposition(data){
        return this.httpClient.post(URL.modifierProposition,data);
     }

     //Save CoordMap
     saveCoordMap(coordMap : CoordMapModel, username) {

        let params = new HttpParams().set("username", username) ;
        return this.httpClient.post(URL.enregistrerCoordMap, coordMap, {params : params}) ;

     }

     rechercherAllProposition(page, numberDataOfPage) : Observable<any>{
        let params = new HttpParams().set("page", page).set("total", numberDataOfPage) ;
        return this.httpClient.get(URL.getAllPparticulierPropositions, {params : params});
    }
}