import { PaiementService } from './../services/paiement.service';
import { ForfaitService } from './../../admin/services/forfait.service';
import { ParticulierService } from './../../customers/services/particulier.service';
import { signUpvalidationService } from './../../home/services/signUp-validation.service';
import { SignInService } from './../../home/services/sign-in.service';
import { URL } from 'src/app/API_url/config';
import { ActivatedRoute } from '@angular/router';
import { DetaisFormationsService } from './../services/detais-formations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {

  //boolean
  isFailed: boolean;
  errorInternet : boolean ;
  message  : string
  disableForfaitNextButton : boolean = false ;


  //Forfais
  forfaits = [] ;
 
  paiementDetails = {

    forfait: null,
    forfaitId : null,
    username : null,
    numeroPaiement : null,
    modePaiement : null

  }

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius: number = 1000;

  urlServer = URL.getPhoto

  step : string ;
  step1 : string;
  step2 : string;
  step3 : string;
  step4 : string;
 
  authenticated : boolean;

  idPropositionFormation : number ;

  propositionFormation = {} ;

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

    let particulier = this.singUpForm.value
    console.log(particulier) ;

    this.signUpService.saveParticulier(particulier).subscribe(

      (resp) => {

        if(resp['error'] !== null){

          this.message = resp['error'];

        }else {

          this.paiementDetails.username = particulier.username ;
          this.next() ;

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

        alert('Payement effectué')
        console.log(resp);
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


  //Method for Jquerry

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

    this.authenticated = this.signInService.isLogged() ;
  
    //Si l'utilisateur est déjà connecté
    if(this.authenticated == true) {
      this.next() ;
      //Sinon on initialise le formulaire d'inscription ou de connexion
    }
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
