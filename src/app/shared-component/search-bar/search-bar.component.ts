import { Router, ActivatedRoute } from '@angular/router';
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

  villeKey: string ;
  searchKey : string ;

  criterRecherche="";
  designationVille="";
  villes : any =[];
  ville: Ville = {};

  @Output() getFormationsFiltrees = new EventEmitter<[]>() ;
  @Output() getFormationsFiltreParVille = new EventEmitter<[]>() ;
 
  constructor(private villeService:VilleService,
              private listFormationsService: ListFormationsService,
              private router : Router,
              private route : ActivatedRoute
    ) { }

  ngOnInit() {
    this.onFetchVilles();

    this.getvalue() ;
    if(this.searchKey){
      this.onFiltreFormationSearch(this.searchKey) ;
    }else if (this.villeKey){
      this.OnFiterDeFormationParVille(this.villeKey);
    } 

  }

  onFiltreFormationSearch(criterRecherche:String){ 
   
    this.listFormationsService.getFilterFormation(criterRecherche,this.villeKey).subscribe(
  
    (reponse)=>{     
    
      this.getFormationsFiltrees.emit(reponse);

    },

    (erreur) => {
      console.log("Une erreur s'est produite: " + erreur);
    }
  )
}


OnFiterDeFormationParVille(designationVille){  

  this.router.navigate(['/formations'], { queryParams: { villeKey: designationVille, searchKey : this.searchKey }}) ;
  this.listFormationsService.getFiterDeFormationParVille(designationVille,this.searchKey).subscribe(
 
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

 goToFormations(villeKey) {
   this.router.navigate(['/formations'], { queryParams:{ villeKey : villeKey}}) ;
 }

    //Recuperer criterRecherche dans l'URL
    getvalue() { 
      
      this.route.queryParams.subscribe(params => {
        this.villeKey = params['villeKey'];
        this.searchKey = params['searchKey'];
          });  
    }
}
