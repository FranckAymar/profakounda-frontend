import { URL } from 'src/app/API_url/config';
import { SnackbarService } from './../../shared-component/services/snackbar.service';
import { InscriptioncourscommunService } from './../inscriptioncourscommun.service';
import { SignInService } from './../../home/services/sign-in.service';
import { PaymentCoursCommunComponent } from './../../shared-component/payment-cours-commun/payment-cours-commun.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-cours-commun',
  templateUrl: './details-cours-commun.component.html',
  styleUrls: ['./details-cours-commun.component.css']
})
export class DetailsCoursCommunComponent implements OnInit {


  urlServer = URL.getAffichePubCoursCommun;


  idCoursCommun: number;
  idPublicCible: number;
  cours = {
    coursCommun: null,
    lieuIntervention: null,
    publicCible: null,
  };
  action: string;

  paymentWaiting : boolean;


  //Sauvegarder l'URL courante 
  snapshot: RouterStateSnapshot;
  state: RouterState;

  //FOr map
  lat : number;
  long : number;
  libelle : string;

  constructor(private dialog: MatDialog,
              private coursCommunService: CoursCommunService,
              private route: ActivatedRoute,
              private router: Router,
              private signService: SignInService,
              private inscritService : InscriptioncourscommunService,
              private snack : SnackbarService,
    ) {

    this.state = router.routerState;
    this.snapshot = this.state.snapshot;
  }


  ngOnInit() {

    this.getIdCoursCommun();
    this.getParameterUrl();

    this.onFectCoursCommun();

    if (this.action === 'subscribe') {
      
      if(this.signService.isLogged())
         this.openDialog({ idCoursCommun: this.idCoursCommun, 
                           idPublicCible: this.idPublicCible,
                            data : this.cours });

    }

    this.isCheckLastInscription();

    
    
  }

  ngOnDestroy() {
    this.dialog.closeAll();
  }


  onSubscribeToCoursCommun(data) {
 
    //this.navigateToSubScribe(data);

    if(!data.coursCommun){
      this.idPublicCible = data.id;
    }

    if (this.signService.isLogged()) {
      this.openDialog({ idCoursCommun: this.idCoursCommun, idPublicCible: this.idPublicCible , data : this.cours });
      return;
    }
 
    console.log(this.snapshot);
    

    this.router.navigate(['/home/sign-in'],     
                                         { queryParams: { 
                                          returnUrl: this.snapshot.url + "?action=subscribe&publicible="+(data.id ? data.id : "") } });

  }


  openDialog(data) {

    //Fermetture par défaut de toutes les dialogues
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(PaymentCoursCommunComponent, {
      disableClose: true,
      width: '800px',
      data: data,

    });


    /*
      Après fermetture de la dialogue
    */
    dialogRef.afterClosed().subscribe(result => {
      

      if(result.etat === 'reussie'){
        this.onFectCoursCommun();
        return ;
      }else if (result.etat === 'enAttente'){
        this.paymentWaiting = true ;
        return
      }

      this.snack.openSnackBar("Une erreur s'est produite pendant le paiement")

    });

  }

  onFectCoursCommun() {

    this.coursCommunService.fetchDetailsCoursCommunForHome(this.idCoursCommun).subscribe(

      (resp) => {
              
        
        this.cours = resp;
        this.initializeMap(this.cours.lieuIntervention);
        console.log(this.cours);


      },
      (error) => {
        console.log(error);

      }
    )

  }


  //Recuperer l'id dans l'URL
  getIdCoursCommun() {


    this.route.params.subscribe(

      (p) => {
        this.idCoursCommun = p['id'];
        this.action = p['action'];
      }
    );

  }

  //Recuperer criterRecherche dans l'URL
  getParameterUrl() {

    this.route.queryParams.subscribe(params => {

      this.action = params['action'];
      this.idPublicCible = params['publicible'];

    });
  }




  navigateToSubScribe(data) {
    if (data.coursCommun) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          action: 'subscribe',
        },
        queryParamsHandling: 'merge',
      });

    } else {
      console.log("publicible");

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          action: 'subscribe',
          idpublicible: data.id

        },
        queryParamsHandling: 'merge',
      });
    }

  }

  isCheckLastInscription() : string{

    let response ;
    let libelleButton = "S'inscrire" ;

    if(!this.signService.isLogged()){
      return libelleButton ;
    }

    this.inscritService.verifiedLastInscription(this.idCoursCommun).subscribe(

      (resp) => {
        
        if(resp){
          this.snack.openSnackBar("Rappel : Vous vous êtes déjà inscrit(e)s à ce cours !")
        }
        

      },
      (error) => {
        console.log(error);

      }
    )

    if(response){
      return "S'inscrire à nouveau"
    }

    
  }

  initializeMap(lieuIntervetion){

   if(lieuIntervetion){
    this.lat = lieuIntervetion.latitude;
    this.long = lieuIntervetion.longitude ;
    this.libelle = lieuIntervetion.libelle ;
   }

  }


 



}
