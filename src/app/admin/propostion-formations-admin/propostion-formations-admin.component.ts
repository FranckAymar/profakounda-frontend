import { PropostionFormationsAdminService } from './../services/propostion-formations-admin.service';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-propostion-formations-admin',
  templateUrl: './propostion-formations-admin.component.html',
  styleUrls: ['./propostion-formations-admin.component.css']
})
export class PropostionFormationsAdminComponent implements OnInit {

  	/*
		 *  
		 *  1 : EnLgne
		 *  2 : En attente
		 *  3 : 
		 *  
		 */

     test ;


  propositionsFormations = [] ;

  constructor(private propostionFormService : PropostionFormationsAdminService) { }

  ngOnInit() {
    //Rechercher toute les formations
    this.onFetchPropositionFormation() ;

  }


  onFetchPropositionFormation(critereFiltre? : number){
    this.propostionFormService.fetchProposition(critereFiltre).subscribe(


      (resp) => {
        this.propositionsFormations = resp ;
        
      },


      (error) => {
        console.log(error);
        

      }

    )
  }


}
