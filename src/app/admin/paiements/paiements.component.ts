import { URL } from 'src/app/API_url/config';
import { PaiementService } from './../../formations/services/paiement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {


  urlServer = URL.getPhoto;
  paiements = [] ;

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




  constructor(private paiementService : PaiementService) { }


  ngOnInit() {

    this.onFetchPaiement(this.page) ;
  }


  onFetchPaiement(pageActive : number) {

    this.page =  pageActive ;

    this.paiementService.getAllPayments(this.page, this.numberDataOfPage).subscribe(


      (resp)=>{


        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);
        
        this.paiements = resp.data ;

      },


      (error)=>{

        console.log(error);
        

      },


    )

  }

}
