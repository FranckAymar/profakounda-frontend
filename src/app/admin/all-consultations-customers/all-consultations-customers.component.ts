import { URL } from 'src/app/API_url/config';
import { PropositionFormationService } from './../../customers/services/propositionFormation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-consultations-customers',
  templateUrl: './all-consultations-customers.component.html',
  styleUrls: ['./all-consultations-customers.component.css']
})
export class AllConsultationsCustomersComponent implements OnInit {

  urlServer = URL.getPhoto;

    //For pagination

  //Nombre de données à chargées à chaque page
  numberDataOfPage : number = 20 ;
  //Page courante
  page : number = 1;
  //Taille totale des données en base de données
  sizeData : number ;
  //Nombre de page totals
  totalPage : number 
  totalPageArray : Array<any> ;



  propositionsParticuliers = [];

  constructor(private propositionFormationService : PropositionFormationService) { }

  ngOnInit() {
    this.onFetchAll(this.page) ;
  }


  onFetchAll(pageActive : number){


    this.page =  pageActive ;

    this.propositionFormationService.rechercherAllProposition(this.page, this.numberDataOfPage).subscribe(


      (resp)=> {

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);

        this.propositionsParticuliers = resp.data ;
      },

      (error)=>{
        console.log(error);
        
      }
      
    );
  }

}
