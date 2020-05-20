import { CoursCommunService } from './../services/cours-commun-service.service';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { PaiementService } from './../../formations/services/paiement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {

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

  constructor(private paiementService : PaiementService,
            private signInService : SignInService,
            private coursCommunService : CoursCommunService) { }

  ngOnInit() {
    this.onFetchPayment(this.page) ;
    this.onFetchCoursCommun();
  }

  onFetchPayment(pageActive) {

    this.page = pageActive ;

    let username = sessionStorage.getItem(this.signInService.USERNAME);

    this.paiementService.getPaymentParticulier(username, this.page, this.numberDataOfPage).subscribe(


      (resp)=> {

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        
        this.totalPageArray = new Array(this.totalPage);
  
        this.paiements = resp.data ;
      },

      (error) => {
        console.log(error);
        
      }


    )
    

  }


  onFetchCoursCommun(){

    this.coursCommunService.fectchCoursCommunSelect().subscribe(

      (resp)=>{

        console.log(resp);
        
      },

      (error)=>{

        console.log(error);
        
      }
    )
  }

}
