import { CoordMapModel } from './../models/CoordModel';
import { HttpClient } from '@angular/common/http';
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
    
    deleteModuleById(id:Number){
        return this.httpClient.post(URL.deleteModule,id);
    }
    rechercherDisponibilites(username:String){
        return this.httpClient.post(URL.rechercherDisponibilites,username);
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


     //Save CoordMap
     saveCoordMap(coordMap : CoordMapModel) {

        return this.httpClient.post(URL.enregistrerCoordMap, coordMap) ;

     }
}