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


  tokenPaymentOrange : string;

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

   // console.log(this.dataReceived);
    

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
          numero : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
        }
      )
    
      


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

  goToStep4(){

    $("#content3").addClass('hide');
    $("#content4").removeClass('hide');
    this.step = 'step4';

    $("#step4").addClass("active");

  }

  onSaveInscrit(){

    let data = {

      idCoursCommun : this.dataReceived.idCoursCommun ,
      idPublicCible : this.dataReceived.idPublicCible ,
      nomInscrit : this.identificationForm.get('nomInscrit').value,
      prenomInscrit : this.identificationForm.get('prenomInscrit').value ,
      numeroPaiement : this.operatorForm.get('numero').value ,
      modePaiement : this.operatorForm.get('operator').value ,
      token : this.tokenPaymentOrange
    }

   // console.log(data.idPublicCible);
    

    this.inscriptionService.inscriptionCoursOrganise(data).subscribe(

      (resp)=>{

       // console.log(resp);
        

        if(resp.code == 0){

          if(data.modePaiement === "MOMO_SKAN" || data.modePaiement === "MOOV_SKAN"){

            this.snackBar.openSnackBar('Un SMS de confirmation vous a été envoyé. \nVeuillez confirmer votre paiement.')
            this.dialogRef.close({etat : 'enAttente'}) ;

          }else {
            this.snackBar.openSnackBar('Payement effectué avec succès !\n Un mail de confirmation vous a été envoyé')
            this.dialogRef.close({etat : 'reussie'}) ;

          }


          
        }else{
          alert("Une erreur s'est produite pendant le paiement.\nVérifiez votre numéro de téléphone ou votre code d'activation puis réessayer");
        }
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
