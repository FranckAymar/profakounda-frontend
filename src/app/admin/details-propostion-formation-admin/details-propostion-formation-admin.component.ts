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


  detailsPropositionFormation = {

    particulier : null,
    rayonIntervention : null,
    propositionFormation : null,
    modulesFormations : null,
    contrats : null,
    disponibilites : null

  } ;
  idPropositionFormation : number;

  constructor(private propostionFormService : PropostionFormationsAdminService,
              private route : ActivatedRoute) { }



  ngOnInit() {

    this.getIdFormation() ;
    this.onDetailsPropostionFormation(this.idPropositionFormation) ;
   
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

      
    this.propostionFormService.fetchPropositionParId(idProposition).subscribe(

      (resp)=>{

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





}
