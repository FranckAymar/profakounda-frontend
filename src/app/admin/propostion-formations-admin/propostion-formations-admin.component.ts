import { SnackbarService } from 'src/app/shared-component/services/snackbar.service';
import { URL } from 'src/app/API_url/config';
import { CauserefusService } from './../services/causerefus.service';
import { PropostionFormationsAdminService } from './../services/propostion-formations-admin.service';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { MatGridTileHeaderCssMatStyler } from '@angular/material';
import { PropositionFormationService } from 'src/app/customers/services/propositionFormation.service';
import { Message } from '../model/message';


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

  message:Message = new Message('','','0');
  constructor(private propostionFormAdminService : PropostionFormationsAdminService,
            private refusService : CauserefusService,
            private snackbarService : SnackbarService) { }

  ngOnInit() {
    //Rechercher toute les formations
    this.onFetchPropositionFormation() ;
    this.onFetchCauseRefus() ;
    

  }


 envoyerMessageProposition(){
  this.propostionFormAdminService.envoyerMessageProposition(this.message).subscribe(
    (reponse)=>{
      this.message = new Message('','','0');
      alert('Message envoyer avec succès.');
    },
    (error)=>{
      console.log('Une erreur s\'est produite');
    }
  )
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

    confirm('Etes vous sur de cette action ?') ;

    this.propostionFormAdminService.supprimerMiseEnLigne(id).subscribe(
    
      (response)=>{ 
        this.onFetchPropositionFormation(this.critereFiltre) ;
         
      },
      (error)=>{
        console.log("Error de suppression: "+error);
      }
    )

  }
  
  onFetchPropositionFormation(critereFiltre? : number){

    
    this.propostionFormAdminService.fetchProposition(critereFiltre).subscribe(


      (resp) => {
        this.propositionsFormations = resp ;
        
      },


      (error) => {
        console.log(error);
        

      }

    )
  }


  onAccorderMiseEnLigne(idProposition){
    this.propostionFormAdminService.mettreEnLigne(idProposition).subscribe(


      (resp)=>{
        
        this.snackbarService.openSnackBar('Mise en ligne réussie')
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

    this.propostionFormAdminService.refuserMiseEnLigne(this.idPropositionCourante, this.causeRefusId).subscribe(


      (resp)=>{
        this.snackbarService.openSnackBar('Action effectuée avec succès')
        document.getElementById('closeModalChoixRefus').click() ;
        this.onFetchPropositionFormation(this.critereFiltre) ;
      },
      (error)=>{

        console.log(error);
        
      }
      
    )
  }




}
