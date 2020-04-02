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
    deleteContratById(id:Number){
        return this.httpClient.post(URL.deleteContrat,id);
    }
    rechercherDisponibilites(username:String){
        return this.httpClient.post(URL.rechercherDisponibilites,username);
    }
    onSaveDisponibilte(data){
        return this.httpClient.post(URL.enregistrerDisponibilte,data);
     }
}