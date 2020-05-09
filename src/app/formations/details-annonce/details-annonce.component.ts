import { Particulier } from './../../home/models/Particulier.model';
import { PaiementService } from './../services/paiement.service';
import { ForfaitService } from './../../admin/services/forfait.service';
import { ParticulierService } from './../../customers/services/particulier.service';
import { SignInService } from './../../home/services/sign-in.service';
import { URL } from 'src/app/API_url/config';
import { ActivatedRoute, Router } from '@angular/router';
import { DetaisFormationsService } from './../services/detais-formations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { MatAutocompleteTrigger } from '@angular/material';
import { PasswordMatch } from 'src/app/custom-validator/password-match';
import { Avis } from 'src/app/home/models/Avis.model';
import { AvisService } from 'src/app/home/services/avis.service';
import { notEqual } from 'assert';
import { not } from '@angular/compiler/src/output/output_ast';

declare var $: any;

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {

  //ViewChild
  @ViewChild('openModalPayment',  {static: false}) openModalPayment: ElementRef<HTMLElement>;
  @ViewChild('closeModalPayment',  {static: false}) closeModalPayment: ElementRef<HTMLElement>;
  @ViewChild('openParticulierDetails',  {static: false}) openParticulierDetails: ElementRef<HTMLElement>;
  @ViewChild('goToSignin',  {static: false}) goToSignin: ElementRef<HTMLElement>;

  
  //Variable for condition
  isFailed: boolean;
  isConnected:boolean=false;
  isProprio:boolean=false;
  etoile1:boolean = false;
  etoile2:boolean = false;
  etoile3:boolean = false;
  etoile4:boolean = false;
  etoile5:boolean = false;
  errorInternet : boolean ;
  message  : string
  error:string;
  success:string;
  disableForfaitNextButton : boolean = false ;
  authenticated : boolean;
  noteIsInvalid:boolean = true;

  //Model
    idPropositionFormation : number ;
    avis:Avis;
    snapshot ;
   
    propositionFormation = {
    code : null,
    idParticulier : null ,
    rayonIntervention : null,
    prenomParticulier : null,
    niveau : null,
    description : null,
    modulesFormations : null,
    contrats : null,
    disponibilites : null,
    
  } ;

  paiementDetails = {

    forfait: null,
    forfaitId : null,
    username : null,
    numeroPaiement : null,
    modePaiement : null,
    token : null

  }

  //Tableaux

  forfaits = [] ;
  tabEtoiles = [];
  tabAvis = [];
  

  particulierDetail : Particulier = {} ;

  //Map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius: number = 1000;
  zoom : number = 14 ;

  urlServer = URL.getPhoto

  step : string ;
  step1 : string;
  step2 : string;
  step3 : string;
  step4 : string;
 


  //Form
  sigInForm : FormGroup ;
  singUpForm : FormGroup ;

  constructor(private detaisFormationsService : DetaisFormationsService,
              private route : ActivatedRoute,
              private signInService : SignInService,
              private formBuilder : FormBuilder,
              private signUpService : ParticulierService,
              private forfaitService : ForfaitService,
              private paiementService : PaiementService,
              private avisService:AvisService,
              private router : Router
              ) { 

                this.step = 'step1';
                this.snapshot = router.routerState.snapshot;
    
              }




  ngOnInit() {
    
    this.getIdFormation();
    this.onGetDetailPropositionFormation() ; 
    this.initSignInForm() ;
    this.initSignUpForm() ;
  }

getColor1(){
 if(this.etoile1)
 {
   return '#FFD700';
 }
 else{
   return 'black';
 }
}
getColor2(){
  if(this.etoile2)
  {
    return '#FFD700';
  }
  else{
    return 'black';
  }
 }
 getColor3(){
  if(this.etoile3)
  {
    return '#FFD700';
  }
  else{
    return 'black';
  }
 }
 getColor4(){
  if(this.etoile4)
  {
    return '#FFD700';
  }
  else{
    return 'black';
  }
 }
 getColor5(){
  if(this.etoile5)
  {
    return '#FFD700';
  }
  else{
    return 'black';
  }
 }
 getColor(etoile){
  if(etoile)
  {
    return '#FFD700';
  }
  else{
    return 'black';
  }
 }
changeEtoile1(){
  if(this.etoile2)
  {
    this.etoile4 = false;
    this.etoile3 = false;
    this.etoile5 = false;
    this.etoile2 = false;
    this.etoile1 = true;
  }
  else{
    this.etoile1 = !this.etoile1;
  }
}
changeEtoile2(){
  if(this.etoile3)
  {
    this.etoile4 = false;
    this.etoile3 = false;
    this.etoile5 = false;
    this.etoile2 = true;
  }
  else{
    this.etoile1 = true;
    this.etoile2 = !this.etoile2;
  }
  
}
changeEtoile3(){
  if(this.etoile4)
  {
    this.etoile5 = false;
    this.etoile4 = false;
    this.etoile3 = true;
  }
  else{
    this.etoile2 = true;
    this.etoile1 = true;
    this.etoile3 = !this.etoile3;
  }
  
}
changeEtoile4(){
  if(this.etoile5)
  {
    this.etoile5 = false;
    this.etoile4 = true;
  }
  else{
    this.etoile2 = true;
    this.etoile1 = true;
    this.etoile3 = true;
    this.etoile4 = !this.etoile4;
  }
 
  
}
changeEtoile5(){
  if(!this.etoile5)
  {
    this.etoile1 = true;
    this.etoile2 = true;
    this.etoile3 = true;
    this.etoile4 = true;
    this.etoile5 = true;
  }
  else
    {
      this.etoile5 = !this.etoile5;
    }
  
}

  initSignInForm(){

    this.sigInForm = this.formBuilder.group({
      username : [null,[ Validators.email, Validators.required]],
      password : [null, Validators.required]
    })

  }

  initSignUpForm(){
    this.singUpForm = this.formBuilder.group({
      email : [null, [ Validators.email, Validators.required]],
      password : [null, Validators.required],
      passwordConfirm : [null, Validators.required ]
    },
    {
      validator : PasswordMatch('password' , 'passwordConfirm')
    }

  );
  }
  
  enregistrerCommentaire(){
    this.addEtoiles();
    var note = 0;
    this.tabEtoiles.forEach(function (value) {
      if(value)
      {
        note++;
      }
     
    });
    this.avis = new Avis(0,this.idPropositionFormation,this.etoile1,this.etoile2,this.etoile3,this.etoile4,this.etoile5,this.avis.commentaire,note,sessionStorage.getItem(this.signInService.USERNAME));
     this.avisService.enregistrerAvis(this.avis).subscribe(
     (response)=>{
       if(response["error"])
       {
         this.error = response["error"];
       }
       if(response["success"])
       {
         this.etoile1 = false;
         this.etoile2 = false;
         this.etoile3 = false;
         this.etoile4 = false;
         this.etoile5 = false;
         this.success = response["success"];
        this.avis = new Avis(0,this.idPropositionFormation,false,false,false,false,false,"",0,sessionStorage.getItem(this.signInService.USERNAME));
        this.onGetDetailPropositionFormation();
       }
     },
     (error)=>{
       console.log(error)
     }
   )
  }
  addEtoiles(){
    this.tabEtoiles = [];
    this.tabEtoiles.push(this.etoile1);
    this.tabEtoiles.push(this.etoile2);
    this.tabEtoiles.push(this.etoile3);
    this.tabEtoiles.push(this.etoile4);
    this.tabEtoiles.push(this.etoile5);
  }
  onSignIn(){

    let username = this.sigInForm.value['username'];
    let password = this.sigInForm.value['password'];
    
    let token = btoa(username + ':' + password);
    
    this.signInService.login(token).subscribe(

 
      (response) => {


          let authorities = response.authorities ;    
          let authority = authorities[0].authority;

          //Sauvegarde du token
          sessionStorage.setItem(this.signInService.TOKEN, token);
            //Sauvegarde de l'authorité
          sessionStorage.setItem(this.signInService.AUHORITY, authority);
            //Sauvegarde du username
          sessionStorage.setItem(this.signInService.USERNAME, username);
    
          //Vérifier si l'utulilisateur a un forfait actif
          this.detaisFormationsService
          .getDetailParticulierParFormation(this.idPropositionFormation).subscribe(


            (resp)=> {


              if(resp.code === 0){

                //Fermetture de la modal de paiement
                this.closeModalPayment.nativeElement.click() ;

                this.particulierDetail =  resp.response ;
                //Ouverture de la modal de demande de contact
                this.openParticulierDetails.nativeElement.click() ;
                
              }
              //L'utilisateur procède au paiement
              else {
                
                if(resp.code === 2){
                  alert("Désolé vous avez épuisés vos demandes de contacts ! Souscrivez à nouveau !")
                }

                this.goToStep2() ;

              }

            },

            (error)=>{

              console.log(error);
              

            }

          )


      },

      (error) => {
        
        if(error.status === 401) {

          this.errorInternet = false ;
          this.isFailed = true ;

        }else{
          this.errorInternet = true ;
          this.isFailed = false ;
        }


      }

   );
  }

  
  onSignUp(){

    this.message = "" ;

    let particulier = this.singUpForm.value

    this.signUpService.saveParticulier(particulier).subscribe(

      (resp) => {        

        if(resp['error']){

          this.message = resp['error'];

        }else if(resp['success'])
        
        {

          alert("Inscription réussie ! Veuillez accéder à vos mails pour l'activation de votre compte");
          this.goToSignin.nativeElement.click() ;


        }

    
      
      },


      (error) => {

        console.log(error);
        

      }

      

    )

  }


  onFetchForFait() {


    this.forfaitService.fetchForfait().subscribe(


      (resp) =>{
        this.forfaits = resp.response ;
              
      },
      (error) =>{
        console.log(error)
      }
    )
  }
    

  //Proceder au payement
  onProcessToPayment() {

    if(this.paiementDetails.modePaiement === "MOMO_SKAN" || this.paiementDetails.modePaiement === "MOOV_SKAN"){
      alert('Pas encore disponible') ;
      return ;
    }

    this.paiementDetails.username = sessionStorage.getItem(this.signInService.USERNAME) ;
    this.paiementDetails.forfaitId = this.paiementDetails.forfait.id ;

    this.paiementService.processToPayment(this.paiementDetails).subscribe(


      (resp)=>{

        if(resp.code == 0){
          alert('Payement effectué');
          this.closeModalPayment.nativeElement.click() ;
          this.contactCustomer();
        }else{
          alert("Une erreur s'est produite pendant le paiement.\nVérifiez votre numéro de téléphone ou votre code d'activation");
        }
      },

      (error)=>{
        console.log(error);
        
      }


    )

  }

  //Recuperer l'id dans l'URL
  getIdFormation() {

                            
    this.route.params.subscribe(

      ( p ) =>{
         this.idPropositionFormation = p['id'] ;
         this.avis = new Avis(0,this.idPropositionFormation,false,false,false,false,false,"",0,sessionStorage.getItem(this.signInService.USERNAME));
      }
    ) ;

  }

  showAlert(){
  
      this.router.navigate(['/home/sign-in'], { queryParams: { returnUrl: this.snapshot.url }});
  }

  onGetDetailPropositionFormation() {

    this.detaisFormationsService.getDetailFormation(this.idPropositionFormation).subscribe(

      (resp)=> {
        if(sessionStorage.getItem(this.signInService.USERNAME))
        {
          if(resp["username"]===sessionStorage.getItem(this.signInService.USERNAME))
          {
            this.isProprio = true;
          }
          this.isConnected = true;
        }
       this.tabAvis = resp["avis"];
        
        if(resp.rayonIntervention){
          this.inititalizeCoordMap(resp.rayonIntervention.latitude,
            resp.rayonIntervention.longitude,
            resp.rayonIntervention.rayon,
            resp.rayonIntervention.zoom);

        }
        
        this.propositionFormation = resp ;
        
      },


      (error)=> {
          console.log(error);
          
      }
    )

  }


  //Method for stepper 

  goToStep2(){
    $("#content1-signin").addClass('hide');
      $("#content1-signup").addClass('hide');
      $("#content2").removeClass('hide');
      this.step = 'step2';

      //On charge les forfais
      this.onFetchForFait() ;

      $("#step2").addClass("active");
  }


  goToStep3(){

    $("#content2").addClass('hide');
    $("#content3").removeClass('hide');
    this.step = 'step3';

    $("#step3").addClass("active");

  }

  goToStep4(){
     
    $("#content3").addClass('hide');
    $("#content4").removeClass('hide');
    this.step = 'step4';

    $("#step4").addClass("active");

    $("#nextButton").addClass("hide");
  }

  goToStep5(){
     
    $("#content4").addClass('hide');
    $("#content5").removeClass('hide');
    this.step = 'step5';

    $("#step5").addClass("active");

    $("#nextButton").addClass("hide");
  }

 next() {

    if (this.step === 'step1') {
      
        this.goToStep2();

    } 
    
    else if (this.step === 'step2') {
    
      this.goToStep3() ;

  
    }
    
    else if (this.step === 'step3') {
     
      this.goToStep4() ;
       
         
    }
    else if (this.step === 'step4') {
     
      this.goToStep5() ;
       
         
    }
  }


  goToSignUp() {

    $("#content1-signin").addClass('hide');
    $("#content1-signup").removeClass('hide');

  }

  goToSignIn(){

    $("#content1-signin").removeClass('hide');
    $("#content1-signup").addClass('hide');

    
  }
  

  contactCustomer() {

    
    let username = sessionStorage.getItem(this.signInService.USERNAME);

    this.detaisFormationsService.getDetailParticulierParFormation(this.idPropositionFormation).subscribe(


      (resp)=>{


        if(resp.code === 0){

          
          this.particulierDetail =  resp.response ;
          //Ouverture de la modal
          this.openParticulierDetails.nativeElement.click() ;
          
        }

        //L'utilisateur procède au paiement
        else {

          if(resp.code === 2){
            alert("Désolé vous avez épuisés vos demandes de contacts ! Souscrivez à nouveau !")
          }

          //Ouverture de la modal
          this.openModalPayment.nativeElement.click() ;

          this.authenticated = this.signInService.isLogged() ;
  
          //Si l'utilisateur est déjà connecté
          if(this.authenticated == true) {
          
            this.goToStep2() ;
          }

        }
        
      },


      (error)=>{
        
        console.log(error);
        
      }


    )

   
  }


  //Methods for Maps
  ajoutMarqueur(lat: number, lng: number) {

    this.lat = lat;
    this.lng = lng;

  }



  changeRaduis(radius) {

    this.radius = radius;

  }

  chooseOperator(operator : string) {

    this.paiementDetails.modePaiement = operator;
    this.paiementDetails.numeroPaiement = '';
    

  }


  //Validation Input

  forfaitChange(){
    
    if(this.paiementDetails.forfait !== null){
      $("#nextBtnForfait").removeAttr("disabled");
    }
  }


  modePaiemenentValidation(){
    
    if(this.paiementDetails.modePaiement !== null && this.paiementDetails.numeroPaiement){
      $("#nextBtnPaiement").prop('disabled', false);
    }else {
      $('#nextBtnPaiement').prop('disabled', true);
    }
    
  }

  inititalizeCoordMap(lat : number, long : number, radius : number, zoom:  number){

    this.lat = lat ;
    this.lng = long ;
    this.radius = radius ;
    this.zoom = zoom ;

  }
  

}
