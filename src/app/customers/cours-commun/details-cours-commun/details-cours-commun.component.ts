import { DetailsInscritsComponent } from './../../../shared-component/details-inscrits/details-inscrits.component';
import { MatDialog } from '@angular/material';
import { InscriptioncourscommunService } from './../../../cours-commun/inscriptioncourscommun.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursCommunService } from '../../services/cours-commun-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-cours-commun',
  templateUrl: './details-cours-commun.component.html',
  styleUrls: ['./details-cours-commun.component.css']
})
export class DetailsCoursCommunComponent implements OnInit {


  zoom = 17 ;

  @Input() cours = {

    coursCommun : null,
    publicCible : null,
    lieuIntervention : null

  };

  idCoursCommun : number;

  inscrits = [];

  constructor(private coursCommunService : CoursCommunService,
              private route : ActivatedRoute,
              private router : Router,
              private inscriptionService : InscriptioncourscommunService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.getIdCoursCommun() ;
    this.onFectCoursCommun();

  }

  onFectCoursCommun(){

    this.coursCommunService.fetchCoursCommun(this.idCoursCommun).subscribe(

      (resp)=>{
        this.cours = resp ;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

  
  //Recuperer l'id dans l'URL
  getIdCoursCommun() {

                            
    this.route.params.subscribe(

      ( p ) =>{
         this.idCoursCommun = p['id'] ;
      }
    ) ;

  }


  onFetchInscrits(idPublicCible?){

    let data = {

      idCoursCommun : this.idCoursCommun,
      idPublicCible : idPublicCible
    }
    
    this.inscriptionService.recupererInscrit(data).subscribe(

      (resp)=>{

        console.log(resp);
        this.openDialog(resp);
        
      },


      (error)=>{
        
        console.log(error);
        
      }
    )


  }

  openDialog(data) {

    //Fermetture par défaut de toutes les dialogues
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(DetailsInscritsComponent, {
      width: '800px',
      data: data,

    });


    /*
      Après fermetture de la dialogue
    */
    dialogRef.afterClosed().subscribe(result => {


    });

  }

}
