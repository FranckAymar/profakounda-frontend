import { VilleService } from './../../admin/services/ville.service';
import { ListFormationsService } from './../../formations/services/list-formations.service';
import { Ville } from './../../admin/model/ville.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  criterRecherche="";
  designationVille="";
  villes : any =[];
  ville: Ville = {};

  @Output() getFormationsFiltrees = new EventEmitter<[]>() ;
  @Output() getFormationsFiltreParVille = new EventEmitter<[]>() ;

  constructor(private villeService:VilleService,
              private listFormationsService: ListFormationsService,
    ) { }

  ngOnInit() {
    this.onFetchVilles();
  }

  onFiltreFormationSearch(criterRecherche:String){  
    
    this.listFormationsService.getFilterFormation(this.criterRecherche).subscribe(
  
    (reponse)=>{      
      this.getFormationsFiltrees.emit(reponse);
    },

    (erreur) => {
      console.log("Une erreur s'est produite: " + erreur);
    }
  )
}

OnFiterDeFormationParVille(designationVille:String){  
    
  this.listFormationsService.getFiterDeFormationParVille(this.designationVille).subscribe(
 
   (reponse)=>{
     
     this.getFormationsFiltreParVille.emit(reponse);
   },
 
   (erreur) => {
     console.log("Une erreur s'est produite: " + erreur);
   }
 )
 }

 onFetchVilles()
 {
   this.villeService.onFetchVilles()
   .subscribe(
     (response)=>{
       this.villes = response;
     },
     (error)=>{
       console.log("Une erreur s'est produite: "+error);
     }
   )
 }

}
