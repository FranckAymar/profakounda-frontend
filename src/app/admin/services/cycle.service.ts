import { URL } from '../../API_url/config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cycle } from '../../model/cycle.model';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(private httpClient : HttpClient) { }


fetchCycles() : Observable<any>   {

  return this.httpClient.get(URL.recupererCycle);

  
}
onSaveCycle(cycle:Cycle){
  return this.httpClient.post(URL.enregistrerCycle,cycle);
 }
 
 onDeleteCycle(cycle:Cycle){
   return this.httpClient.post(URL.supprimerCycle,cycle);
 }

 getCycle(cycle:Cycle){
  return this.httpClient.post(URL.retrouverCycleParId,cycle);
}
updateCycle(cycle:Cycle){
  return this.httpClient.post(URL.modifierCycle,cycle);
}

 


}
