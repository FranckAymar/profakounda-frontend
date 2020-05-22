import { SnackbarService } from './../services/snackbar.service';
import { InscriptioncourscommunService } from './../../cours-commun/inscriptioncourscommun.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';

declare var $: any;


@Component({
  selector: 'app-payment-cours-commun',
  templateUrl: './payment-cours-commun.component.html',
  styleUrls: ['./payment-cours-commun.component.css']
})
export class PaymentCoursCommunComponent implements OnInit {


  //Model
  paiementDetails = {

    username : null,
    numeroPaiement : null,
    modePaiement : null,
    token : null

  }

  step;

  //Boolean
  isNotCheck = true ; 

  //Form group
  identificationForm : FormGroup ;
  operatorForm : FormGroup ;

  constructor(private dialogRef: MatDialogRef<PaymentCoursCommunComponent>,
             @Inject(MAT_DIALOG_DATA) public dataReceived: any,
             private formBuilder : FormBuilder,
             private inscriptionService : InscriptioncourscommunService,
             private snackBar: SnackbarService


  ) {

    this.step = 'step1';


   }

  ngOnInit() {

    console.log(this.dataReceived);
    

    this.initIdentificationForm();
    this.initOperatorForm();
    
  }

  initIdentificationForm(){

   this.identificationForm = this.formBuilder.group(

      {
        nomInscrit : ['', Validators.required],
        prenomInscrit : ['', Validators.required]
      }

    )
  }

    initOperatorForm(){

      this.operatorForm = this.formBuilder.group(

        {
          operator : ['', Validators.required],
          numero : ['', [Validators.required, Validators.minLength(8)]]
        }
      )
    
      


  }


  modePaiemenentValidation(){
    
    if(this.paiementDetails.modePaiement !== null && this.paiementDetails.numeroPaiement){
      $("#nextBtnPaiement").prop('disabled', false);
    }else {
      $('#nextBtnPaiement').prop('disabled', true);
    }
    
  }


  next() {

    if (this.step === 'step1') {
      
        this.goToStep2();

    } 
    
    else if (this.step === 'step2') {
    
      this.goToStep3() ;

  
    }

   
  }

  //Method for stepper 

  goToStep2(){
    $("#content1").addClass('hide');
      $("#content1").addClass('hide');
      $("#content2").removeClass('hide');
      this.step = 'step2';


      $("#step2").addClass("active");
  }


  goToStep3(){

    $("#content2").addClass('hide');
    $("#content3").removeClass('hide');
    this.step = 'step3';

    $("#step3").addClass("active");

  }


  onSaveInscrit(){

    let data = {

      idCoursCommun : this.dataReceived.idCoursCommun ,
      idPublicCible : this.dataReceived.idPublicCible ,
      nomInscrit : this.identificationForm.get('nomInscrit').value,
      prenomInscrit : this.identificationForm.get('prenomInscrit').value ,

    }

    console.log(data.idPublicCible);
    

    if(data.idPublicCible){
      this.saveInscritPublicCible(data);
    }else {
      this.saveInscritsCoursCommun(data);
    }
    
  }


  saveInscritsCoursCommun(data){
    this.inscriptionService.saveInscritsCoursCommun(data).subscribe(

      (resp)=>{

        console.log(resp);
        this.dialogRef.close({etat : 'reussie'}) ;
        this.snackBar.openSnackBar('Inscription réussie !');

        
      },

      (error)=>{

        console.log(error);
        
      },
    )
    
    
  }


  saveInscritPublicCible(data){
    
    console.log("public cible");
    

    this.inscriptionService.saveInscritsPublicCible(data).subscribe(

      (resp)=>{

        console.log(resp);
        this.dialogRef.close({etat : 'reussie'}) ;
        this.snackBar.openSnackBar('Inscription réussie !');

        
      },

      (error)=>{

        console.log(error);
        
      },
    )
    
    
  }

  checkBoxChange(){

    this.initIdentificationForm();
    this.isNotCheck = !this.isNotCheck ;


    if(this.isNotCheck ===false ){
      this.identificationForm.get('nomInscrit').clearValidators();
      this.identificationForm.get('nomInscrit').updateValueAndValidity();
      this.identificationForm.get('prenomInscrit').clearValidators();
      this.identificationForm.get('prenomInscrit').updateValueAndValidity();
  
    }

  

  }



}
