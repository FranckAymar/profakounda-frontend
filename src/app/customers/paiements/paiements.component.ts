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

  constructor(private paiementService : PaiementService,
            private signInService : SignInService) { }

  ngOnInit() {
    this.onFetchPayment() ;
  }

  onFetchPayment() {

    let username = sessionStorage.getItem(this.signInService.USERNAME);

    this.paiementService.getPaymentParticulier(username).subscribe(


      (resp)=> {

        this.paiements = resp.response ;
      },

      (error) => {
        console.log(error);
        
      }


    )
    

  }

}
