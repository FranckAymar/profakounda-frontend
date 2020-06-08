import { Component, OnInit } from '@angular/core';
import { CoursCommunAdminService } from '../services/cours-commun-admin.service';

@Component({
  selector: 'app-demande-virement',
  templateUrl: './demande-virement.component.html',
  styleUrls: ['./demande-virement.component.css']
})
export class DemandeVirementComponent implements OnInit {

  constructor(private coursCommunAdminService : CoursCommunAdminService) { }
  resultats= [];
  organisations = [];
  revenuGlobale  : {
    pointGlobale : null,
    revenuProfAkounda : null,
    revenuExterieur : null
  };

  ngOnInit() {
    this.onFetchDemandeVirements();
  }


  onFetchDemandeVirements(){

    
    this.coursCommunAdminService.demandeVirementAdmin().subscribe(

      (resp) => {
       
       this.resultats = resp['resultats'];
       this.revenuGlobale = resp['compteRenduGlobale'];
       
      },

      (error) => {
        console.log(error);
        

      }

    )
  }
}
