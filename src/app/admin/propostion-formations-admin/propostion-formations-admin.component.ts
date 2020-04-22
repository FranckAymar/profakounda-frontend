import { URL } from 'src/app/API_url/config';
import { CauserefusService } from './../services/causerefus.service';
import { PropostionFormationsAdminService } from './../services/propostion-formations-admin.service';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { MatGridTileHeaderCssMatStyler } from '@angular/material';

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

    critereFiltre : number ;
    idPropositionCourante : number ;
    causeRefusId : number;

    detailsPropositionFormation = {} ;


    propositionsFormations = [] ;
    causeRefusTab = [];


      //Map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius: number = 1000;
  zoom : number = 14 ;

  urlServer = URL.getPhoto


  constructor(private propostionFormService : PropostionFormationsAdminService,
            private refusService : CauserefusService) { }

  ngOnInit() {
    //Rechercher toute les formations
    this.onFetchPropositionFormation() ;
    this.onFetchCauseRefus() ;
    

  }


 

  onFetchCauseRefus(){

    this.refusService.fetchRefus().subscribe(

      (resp)=>{

        this.causeRefusTab = resp ;
      },

      (error)=>{

        console.log(error);
        
      }
    )
  }


  supprimerMiseEnLigne(id){
    this.propostionFormService.supprimerMiseEnLigne(id).subscribe(
    
      (response)=>{ 
        alert("operation effectuée avec succès")
        this.onFetchPropositionFormation() ;
         
      },
      (error)=>{
        console.log("Error de suppression: "+error);
      }
    )

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


  onAccorderMiseEnLigne(idProposition){
    this.propostionFormService.mettreEnLigne(idProposition).subscribe(


      (resp)=>{
        
        this.onFetchPropositionFormation(this.critereFiltre)

      },
      (error)=>{
          console.log(error);
          
      }
      

    )
  }

  prepareToRefusEnLigne(idProposition){
    this.idPropositionCourante = idProposition ;
  }

  onRefuserMiseEnLigne(){

    this.propostionFormService.refuserMiseEnLigne(this.idPropositionCourante, this.causeRefusId).subscribe(


      (resp)=>{
        alert("Refus validé") ;
        document.getElementById('closeModalChoixRefus').click() ;
        this.onFetchPropositionFormation(this.critereFiltre) ;
      },
      (error)=>{

        console.log(error);
        
      }
      
    )
  }




}
