import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { URL } from 'src/app/API_url/config';
import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {

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

  particuliers;
  message:Message = new Message('','','0');
  constructor(private particulierService: ParticulierService) { }

  ngOnInit() {
    this.onFetchAllCustomer(this.page);
  }

  envoyerMessageCompte(){
    this.particulierService.envoyerMessageCompte(this.message).subscribe(
      (response)=>{
        alert('Message envoyé avec succès.');
        this.message = new Message('','','0');
  
      },
      (error)=>{
        console.log("Une erreur s'est produite");
      }
    )
  }
  onFetchAllCustomer(pageActive : number){

    this.page =  pageActive ;

    this.particulierService.getAllCustomers(this.page, this.numberDataOfPage).subscribe(


      (resp)=>{

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);
        
        this.particuliers = resp.data ;

      },
      (error)=>{

        console.log(error);
        
      },


    )
  }

}
