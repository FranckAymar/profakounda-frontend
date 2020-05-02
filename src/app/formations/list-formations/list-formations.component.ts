import { URL } from 'src/app/API_url/config';
import { ListFormationsService } from './../services/list-formations.service';
import { Component, OnInit } from '@angular/core';
import { FilterArrayPipe } from './filter.pipe';
import { ActivatedRoute } from '@angular/router';
import { VilleService } from 'src/app/admin/services/ville.service';
import { Ville } from 'src/app/admin/model/ville.model';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
  providers: [FilterArrayPipe],
})

export class ListFormationsComponent implements OnInit {


  //Map

  lat: number = 5.304001315606169;
  lng: number = -4.049957191526247;
  radius: number = 1000;
  zoom: number = 11;


  criterRecherche="";
  designationVille="";
  villes : any =[];
  ville: Ville = {};
 
  ladate = new Date();

  propositionFormations = [];
  modulesFormation = [];
  FormationFiltres = [];
  urlServer = URL.getPhoto;

  //Nombre de données à chargées à chaque page
  numberDataOfPage: number = 15;
  //Page courante
  page: number = 1;
  //Taille totale des données en base de données
  sizeData: number;
  //Nombre de page totals
  totalPage: number
  totalPageArray: Array<any>;


  constructor(private listFormationsService: ListFormationsService,private route: ActivatedRoute,private villeService:VilleService) { }


  ngOnInit() {
    this.getvalue();
    this.onFetchVilles();
   this.onGetListFormation(this.page);
   this.OnFiltreFormation();
   

  }
  onGetListFormation(pageActive) {

    this.page = pageActive;

    this.listFormationsService.getListPropositionFormations(this.page, this.numberDataOfPage).subscribe(


      (resp) => {

        this.sizeData = resp.totalData;

        this.totalPage = (this.sizeData / this.numberDataOfPage);

        if (this.sizeData % this.numberDataOfPage != 0) {
          this.totalPage = Math.ceil(this.totalPage);
        }
 
        this.totalPageArray = new Array(this.totalPage);

        console.log(resp.data);
        
        this.propositionFormations = resp.data;
      },


      (error) => {

        console.log(error);


      }
    )
 
  }
  
  OnFiltreFormation(){  
  
      this.listFormationsService.getFilterFormation(this.criterRecherche).subscribe(
    
      (reponse)=>{
        console.log(reponse);
        
        this.propositionFormations=reponse;
      },

      (erreur) => {
        console.log("Une erreur s'est produite: " + erreur);
      }
    )
  }

  OnFiltreFormationSearch(criterRecherche:String){  
    
    this.listFormationsService.getFilterFormation(this.criterRecherche).subscribe(
  
    (reponse)=>{
      console.log(reponse);
      
      this.propositionFormations=reponse;
    },

    (erreur) => {
      console.log("Une erreur s'est produite: " + erreur);
    }
  )
}

OnFiterDeFormationParVille(designationVille:String){  
    
 this.listFormationsService.getFiterDeFormationParVille(this.designationVille).subscribe(

  (reponse)=>{
    console.log(reponse);
    
    this.propositionFormations=reponse;
  },

  (erreur) => {
    console.log("Une erreur s'est produite: " + erreur);
  }
)
}


  inititalizeCoordMap(lat: number, long: number, radius: number, zoom: number) {

    this.lat = lat;
    this.lng = long;
    this.radius = radius;
    this.zoom = zoom;

  }

  mapClick(event) {
    console.log(event);
    
  }

  zoomChange(event){
    console.log(event);
    
  }

  viewCustomerInMap(coord){
    this.zoom = 9 ;

    //Pour l'animations
    setTimeout(()=>{   
    this.lat = coord.latitude ;
    this.lng = coord.longitude ;
    this.zoom = 13 ;
    this.radius = coord.rayon ;
 }, 1000);
   
  }

  //Recuperer criterRecherche dans l'URL
  getvalue() {

                            
    this.route.params.subscribe(

      ( variable ) =>{
         this.criterRecherche= variable['value'] ;
   
      }
    ) ;

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
