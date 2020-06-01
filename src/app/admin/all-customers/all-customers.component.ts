import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { URL } from 'src/app/API_url/config';
import { Component, OnInit } from '@angular/core';

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

  constructor(private particulierService: ParticulierService) { }

  ngOnInit() {
    this.onFetchAllCustomer(this.page);
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
