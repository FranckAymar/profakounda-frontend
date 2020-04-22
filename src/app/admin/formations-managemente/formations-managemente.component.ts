import { Component, OnInit } from '@angular/core';
import { FormationMangementeService } from '../services/formationMangemente.service';
import { URL } from 'src/app/API_url/config';

@Component({
  selector: 'app-formations-managemente',
  templateUrl: './formations-managemente.component.html',
  styleUrls: ['./formations-managemente.component.css']
})
export class FormationsManagementeComponent implements OnInit {

  //Map

  lat: number = 5.304001315606169;
  lng: number = -4.049957191526247;
  radius: number = 1000;
  zoom: number = 11;
  valeur ="";
  error:string;
  propositionFormations = [];
  modulesFormation = [];
  FormationFiltres = [];
  urlServer = URL.getPhoto;
  FormationEnLignes: any = [];

  //Nombre de données à chargées à chaque page
  numberDataOfPage: number = 15;
  //Page courante
  page: number = 1;
  //Taille totale des données en base de données
  sizeData: number;
  //Nombre de page totals
  totalPage: number
  totalPageArray: Array<any>;

  constructor(private formationMangementeService:FormationMangementeService) { }

  ngOnInit() {
    this.onGetListFormation(this.page);
    //this.listeFormationEnligne();
  } 
  
  //listeFormationEnligne() { 
  
   // this.formationMangementeService.onFetchFormationEnligne()
   // .subscribe(
    //  (response)=>{
     //   this.FormationEnLignes = response;
     // },
      //(error)=>{
      //  console.log("Une erreur s'est produite: "+error);
      //}
   // )
  //}


  supprimerMiseEnLigne(id){
    this.formationMangementeService.supprimerMiseEnLigne(id).subscribe(
    
      (response)=>{ 

        this.error = response['error'];
        this.onGetListFormation(this.page);
      },
      (error)=>{
        console.log("Error de suppression: "+error);
      }
    )

  }

  onGetListFormation(pageActive) {

    this.page = pageActive;

    this.formationMangementeService.getListPropositionFormations(this.page, this.numberDataOfPage).subscribe(


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
  
  OnFiltreFormation(filtre:String){
    
    this.formationMangementeService.getFilterFormation(filtre).subscribe(
    
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

}
