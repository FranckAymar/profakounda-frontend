import { AlertComponent } from './../../../shared-component/alert/alert.component';
import { SnackbarService } from './../../../shared-component/services/snackbar.service';
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

  messageAlert = 'Cette action fera passée le nombre de places disponibles à illimité' ;

  idCoursCommun : number;

  inscrits = [];

  constructor(private coursCommunService : CoursCommunService,
              private route : ActivatedRoute,
              private router : Router,
              private inscriptionService : InscriptioncourscommunService,
              private dialog : MatDialog,
              private snackService : SnackbarService) { }

  ngOnInit() {
    this.getIdCoursCommun() ;
    this.onFectCoursCommun();

  }

  onFectCoursCommun(){

    this.coursCommunService.fetchCoursCommun(this.idCoursCommun).subscribe(

      (resp)=>{
        this.cours = resp ;
        this.idCoursCommun = resp["coursCommun"].id;
        console.log(resp);
        
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


  onFetchInscrits(dataPublic?){

    let data ;
    if(dataPublic){
      data= {

        idCoursCommun : this.idCoursCommun,
        idPublicCible : dataPublic.id
      }
    }else{

      data= {

        idCoursCommun : this.idCoursCommun,
        idPublicCible : ''

    }
  }
    
    this.inscriptionService.recupererInscrit(data).subscribe(

      (resp)=>{

        console.log(resp);

        if(dataPublic){
          
          this.openDialog(
            {inscrit : resp,
             details : dataPublic});

             return ;
        }
        this.openDialog(
            {inscrit : resp,
             details : this.cours});
        
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

  openAlert(type, idPublicCible?) {

    //Fermetture par défaut de toutes les dialogues
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '400px',
      data : {type : type , message : this.messageAlert}

    });


    /*
      Après fermetture de la dialogue
    */
    dialogRef.afterClosed().subscribe(result => {

     if(result){
        
      if(result.type === 'publicCible' && result.response ==='oui'){
        this.onFermerInscriptionPublicCble(idPublicCible);
      }else if(result.type === 'coursGeneral' && result.response ==='oui'){
        this.onFermerInscriptionCoursCommun();
      }

     }
    });

  }



  onFermerInscriptionPublicCble(idPublicCible){

    this.coursCommunService.fermerInscriptionPublicCible(idPublicCible).subscribe(

      (resp)=>{
        
        if(resp['inscriptionFermer']){
          this.snackService.openSnackBar("Inscription fermée avec succès");
        
        }else{
          this.snackService.openSnackBar("Inscription ouverte avec succès");

        }
        this.onFectCoursCommun();
      },


      (error)=>{
        
        console.log(error);
        this.snackService.openSnackBar("Une erreur s'est produite veuillez réessayer");

      }
    )

  }

  onFermerInscriptionCoursCommun(){

    this.coursCommunService.fermerInscriptionCoursCommun(this.idCoursCommun).subscribe(

      (resp)=>{

        if(resp['inscriptionFermer']){
          this.snackService.openSnackBar("Inscription fermée avec succès");
        
        }else{
          this.snackService.openSnackBar("Inscription ouverte avec succès");

        }
        this.onFectCoursCommun();
      },


      (error)=>{
        
        console.log(error);
        this.snackService.openSnackBar("Une erreur s'est produite veuillez réessayer");

      }
    )

  }

}
