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


  constructor(private paiementService : PaiementService) { }


  ngOnInit() {

    this.onFetchPaiement() ;
  }


  onFetchPaiement() {

    this.paiementService.getAllPayments().subscribe(


      (resp)=>{

        console.log(resp);
        
        this.paiements = resp.response ;

      },


      (error)=>{

        console.log(error);
        

      },


    )

  }

}
