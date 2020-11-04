import { URL } from 'src/app/API_url/config';
import { ListFormationsService } from './../services/list-formations.service';
import { Component, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VilleService } from 'src/app/admin/services/ville.service';
import { Ville } from 'src/app/admin/model/ville.model';
import * as $ from 'jquery';
@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
})

export class ListFormationsComponent implements OnInit {


  screenHeight: number;
    screenWidth: number;

  //QuerryUrl Params
  villeKey : string ;
  searchKey : string ;

  //Map

  lat: number = 5.304001315606169;
  lng: number = -4.049957191526247;
  radius: number = 1000;
  zoom: number = 9;


  criterRecherche="";
  designationVille="";
  villes : any =[];
  ville: Ville = {};
 
  propositionFormations = [];
  modulesFormation = [];
  contrats = [];
  FormationFiltres = [];
  urlServer = URL.getPhoto;

  //Nombre de données à chargées à chaque page
  numberDataOfPage: number = 6;
  //Page courante
  page: number = 1;
  //Taille totale des données en base de données
  sizeData: number;
  //Nombre de page totals
  totalPage: number
  totalPageArray: Array<any>;


  constructor(private listFormationsService: ListFormationsService,
              private route: ActivatedRoute,
              private villeService:VilleService) { }


  ngOnInit() {

    this.getScreenSize();
    
    this.getvalue() ;
   
    if(this.villeKey == undefined &&  this.searchKey == undefined){
      
      this.onGetListFormation(this.page);

    } 
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
        this.propositionFormations = resp.data;
       this.goToTopPage(); 
      },


      (error) => {

        console.log(error);


      }
    )
 
  } 
  
  OnFiltreFormation(propositionFormation){  
        
        this.propositionFormations=propositionFormation;
  }

  onFiltreFormationSearch(criterRecherche:String){  
    
    this.listFormationsService.getFilterFormation(criterRecherche,this.villeKey).subscribe(
  
    (reponse)=>{
      this.propositionFormations=reponse;
      
    },

    (erreur) => {
      console.log("Une erreur s'est produite: " + erreur);
    }
  )
}

OnFiterDeFormationParVille(propositionFormation){ 
      
  this.propositionFormations=propositionFormation;

}



  inititalizeCoordMap(lat: number, long: number, radius: number, zoom: number) {

    this.lat = lat;
    this.lng = long;
    this.radius = radius;
    this.zoom = zoom;

  }

  mapClick(event) {
   // console.log(event);
    
  }

  zoomChange(event){
    //console.log(event);
    
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
    
    this.route.queryParams.subscribe(params => {
       this.villeKey = params['villeKey'];
       this.searchKey = params['searchKey']

  });
    
   
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


  goToTopPage(){

    //Si la taille (largeur) de l'écran est comprise entre [990 , 2000]
    if(this.screenWidth <= 2000 && this.screenWidth >= 990 ){
      $('#list-scroll').offset().top;
      $('#list-scroll').animate({ scrollTop: 0 }, 900); 
    }else {

      window.scroll(0,0);

    }

   
  
  }

  //Pour recuperer la taille courante du navigateur
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        
  }

}
