import { FormGroup, FormBuilder } from '@angular/forms';
import { SnackbarService } from './../../shared-component/services/snackbar.service';
import { CauserefusService } from './../services/causerefus.service';
import { ActivatedRoute } from '@angular/router';
import { URL } from 'src/app/API_url/config';
import { PropostionFormationsAdminService } from './../services/propostion-formations-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-propostion-formation-admin',
  templateUrl: './details-propostion-formation-admin.component.html',
  styleUrls: ['./details-propostion-formation-admin.component.css']
})
export class DetailsPropostionFormationAdminComponent implements OnInit {



      //Map

      lat: number = 5.338390;
      lng: number = -4.097748;
      radius: number = 1000;
      zoom : number = 14 ;
    
      urlServer = URL.getPhoto

      causeRefusTab = [];
      causeRefusId   ;


  detailsPropositionFormation = {

    particulier : null,
    rayonIntervention : null,
    propositionFormation : null,
    modulesFormations : null,
    contrats : null,
    disponibilites : null

  } ;
  idPropositionFormation;

  causeRefusForm : FormGroup ;

  constructor(private propostionFormAdminService : PropostionFormationsAdminService,
              private route : ActivatedRoute,
              private causeRefusService : CauserefusService,
              private snackbarService : SnackbarService,
              private formBuilder : FormBuilder) { }



  ngOnInit() {

    this.getIdFormation() ;
    this.onFetchCauseRefus();
    this.onDetailsPropostionFormation(this.idPropositionFormation) ;
   
    this.initForm() ;
  }

  initForm(){

    this.causeRefusForm = this.formBuilder.group(
      {
        cause : ['']
      }
    )
  }

  selectRefus(id){
    console.log(id);
    
  }
    //Recuperer l'id dans l'URL
    getIdFormation() {

                            
      this.route.params.subscribe(
  
        ( p ) =>{
           this.idPropositionFormation = p['id'] ;
     
        }
      ) ;
  
    }


  onDetailsPropostionFormation(idProposition){

      
    this.propostionFormAdminService.fetchPropositionParId(idProposition).subscribe(

      (resp)=>{

        console.log(resp);
        
        if(resp.rayonIntervention){
          this.inititalizeCoordMap(resp.rayonIntervention.latitude,
            resp.rayonIntervention.longitude,
            resp.rayonIntervention.rayon,
            resp.rayonIntervention.zoom);

        }
        this.detailsPropositionFormation = resp ;
      },


      (error)=>{

        console.log(error);
        
      },

    )
}


inititalizeCoordMap(lat : number, long : number, radius : number, zoom:  number){

  this.lat = lat ;
  this.lng = long ;
  this.radius = radius ;
  this.zoom = zoom ;

}



onMettreEnLigne(){

  if(confirm("Mettre en ligne ?")){


    this.propostionFormAdminService.mettreEnLigne(this.detailsPropositionFormation.propositionFormation.id).subscribe(

      (resp)=>{
        this.snackbarService.openSnackBar('Action effectuée avec succès')
        this.onDetailsPropostionFormation(this.idPropositionFormation) ;
  
  

      },


      (error)=>{
       
        console.log(error);
        
      }
    )


  }

}


onRefuserMiseEnLigne(){
 
 
  this.causeRefusId = this.causeRefusForm.get('cause').value
  if(confirm("Refuser Mise en ligne ?")){
    this.propostionFormAdminService.refuserMiseEnLigne(this.detailsPropositionFormation.propositionFormation.id, this.causeRefusId).subscribe(


      (resp)=>{
        this.snackbarService.openSnackBar('Action effectuée avec succès')
        document.getElementById('closeModalChoixRefus').click() ;
        this.onDetailsPropostionFormation(this.idPropositionFormation) ;
      },
      (error)=>{
  
        console.log(error);
        
      }
      
    )
  }
}

onMettreHorsLigne(){

  if(confirm("Mettre hors ligne ?")){

  this.propostionFormAdminService.supprimerMiseEnLigne(this.detailsPropositionFormation.propositionFormation.id).subscribe(

    (resp)=>{

      this.snackbarService.openSnackBar('Action effectuée avec succès')
      this.onDetailsPropostionFormation(this.idPropositionFormation) ;

    },

    (error)=>{

      console.log(error);
      
    }
  )
  }
}



onFetchCauseRefus(){

  this.causeRefusService.fetchRefus().subscribe(

    (resp)=>{

      this.causeRefusTab = resp ;
    },

    (error)=>{

      console.log(error);
      
    }
  )
}



}
