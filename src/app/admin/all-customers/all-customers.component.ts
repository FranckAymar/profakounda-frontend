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
  numberDataOfPage : number = 10 ;
  page : number = 1;
  sizeData : number ;
  totalPage : number ;
  totalPageArray : Array<any> ;

  particuliers;

  constructor(private particulierService: ParticulierService) { }

  ngOnInit() {
    this.onFetchAllCustomer(this.page);
  }

  onFetchAllCustomer(page){

    this.particulierService.getAllCustomers(page, this.numberDataOfPage).subscribe(


      (resp)=>{

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);

        console.log(this.totalPageArray);
        
        this.particuliers = resp.data ;

      },
      (error)=>{

        console.log(error);
        
      },


    )
  }

}
