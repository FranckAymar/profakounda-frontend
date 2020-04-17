import { URL } from 'src/app/API_url/config';
import { ListFormationsService } from './../services/list-formations.service';
import { Component, OnInit } from '@angular/core';
import{ FilterArrayPipe} from './filter.pipe';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
  providers: [FilterArrayPipe],
})

export class ListFormationsComponent implements OnInit {
  
  valeur="";
  propositionFormations = [];
  modulesFormation = [];
  FormationFiltres=[];
  urlServer = URL.getPhoto;

    //Nombre de données à chargées à chaque page
    numberDataOfPage : number = 15 ;
    //Page courante
    page : number = 1;
    //Taille totale des données en base de données
    sizeData : number ;
    //Nombre de page totals
    totalPage : number 
    totalPageArray : Array<any> ;

  constructor(private listFormationsService : ListFormationsService) { }

  
  ngOnInit() {
  this.onGetListFormation(this.page);
  
  }

  onGetListFormation(pageActive) {

    this.page = pageActive ;

    this.listFormationsService.getListPropositionFormations(this.page, this.numberDataOfPage).subscribe(

      (resp) =>{
        

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);

        this.propositionFormations = resp.data ;
     
      },

      
      (error) =>{

        console.log(error);
        

      }
    )
 
  }
  
  OnFiltreFormation(filtre:String){
    
    this.listFormationsService.getFilterFormation(filtre).subscribe(
    
      (reponse)=>{
       
        this.propositionFormations=reponse;
      },

      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }

}
