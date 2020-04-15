import { PaiementService } from './../services/paiement.service';
import { ForfaitService } from './../../admin/services/forfait.service';
import { ParticulierService } from './../../customers/services/particulier.service';
import { SignInService } from './../../home/services/sign-in.service';
import { URL } from 'src/app/API_url/config';
import { ActivatedRoute } from '@angular/router';
import { DetaisFormationsService } from './../services/detais-formations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { MatAutocompleteTrigger } from '@angular/material';

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
  errorInternet : boolean ;
  message  : string
  disableForfaitNextButton : boolean = false ;
  authenticated : boolean;


  //Model


  idPropositionFormation : number ;

  propositionFormation = {} ;

  forfaits = [] ;
 
  paiementDetails = {

    forfait: null,
    forfaitId : null,
    username : null,
    numeroPaiement : null,
    modePaiement : null

  }

  particulierDetail = {} ;

  //Map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius: number = 1000;

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
              private paiementService : PaiementService) { 

                this.step = 'step1';
    
              }




  ngOnInit() {

    this.getIdFormation();
    this.onGetDetailPropositionFormation() ; 
    this.initSignInForm() ;
    this.initSignUpForm() ;
 
  }



  initSignInForm(){

    this.sigInForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required]
    })

  }

  initSignUpForm(){
    this.singUpForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required],
      passwordConfirm : [null, Validators.required]
    })
  }

  onSignIn(){

    let username = this.sigInForm.value['username'];
    let password = this.sigInForm.value['password'];
    
    let token = btoa(username + ':' + password);
    console.log(token);
    
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
    
          this.next() ;

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
    console.log(particulier) ;

    this.signUpService.saveParticulier(particulier).subscribe(

      (resp) => {

        console.log(resp);
        

        if(resp['error'] !== null){

          this.message = resp['error'];

        }else {

          alert("Inscription réussie ! Veuillez accéder à vos mails pour l'activation de votre compte");
         // this.paiementDetails.username = particulier.username ;
          //this.next() ;
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

    this.paiementDetails.username = sessionStorage.getItem(this.signInService.USERNAME) ;
    this.paiementDetails.forfaitId = this.paiementDetails.forfait.id ;

    this.paiementService.processToPayment(this.paiementDetails).subscribe(


      (resp)=>{

        alert('Payement effectué');
        this.closeModalPayment.nativeElement.click() ;
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
   
      }
    ) ;

  }


  onGetDetailPropositionFormation() {

    this.detaisFormationsService.getDetailFormation(this.idPropositionFormation).subscribe(

      (resp)=> {
       
        this.propositionFormation = resp ;
        
      },


      (error)=> {
          console.log(error);
          
      }
    )

  }


  //Method for stepper 

 next() {

    if (this.step === 'step1') {
      $("#content1-signin").addClass('hide');
      $("#content1-signup").addClass('hide');
      $("#content2").removeClass('hide');
      this.step = 'step2';

      //On charge les forfais
      this.onFetchForFait() ;

      $("#step2").addClass("active");


    } 
    
    else if (this.step === 'step2') {
      $("#content2").addClass('hide');
      $("#content3").removeClass('hide');
      this.step = 'step3';

      $("#step3").addClass("active");


  
    }
    
    else if (this.step === 'step3') {
      
      $("#content3").addClass('hide');
      $("#content4").removeClass('hide');
      this.step = 'step4';

      $("#step4").addClass("active");

      $("#nextButton").addClass("hide");
     
       
         
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

    this.detaisFormationsService.getDetailParticulierParFormation(this.idPropositionFormation, username).subscribe(


      (resp)=>{

        console.log(resp);


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
            this.next() ;
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
    console.log(this.paiementDetails);
    

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
  

}
