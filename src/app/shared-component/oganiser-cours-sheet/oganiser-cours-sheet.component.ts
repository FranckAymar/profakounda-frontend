import { NiveauService } from './../../admin/services/niveau.service';
import { Niveau } from './../../admin/model/niveau.model';
import { FormationService } from './../../admin/services/formation.service';
import { publicCibleModel } from './../../home/models/publiccible';
import { LieuInterventionModel } from './../../home/models/lieuintervention';
import { CoursCommunModel } from './../../home/models/courscommun';
import { FormBuilder, FormGroup, Validators, Form, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-oganiser-cours-sheet',
  templateUrl: './oganiser-cours-sheet.component.html',
  styleUrls: ['./oganiser-cours-sheet.component.css']
})
export class OganiserCoursSheetComponent implements OnInit {


  //FormGroup
  coursCommunForm : FormGroup;
  publicCibleForm : FormGroup;
  lieuInterventionForm : FormGroup ;


  //Variable for map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius : number = 1000
  zoom : number = 15 ; 

  step : string ;
  step1 : string;
  step2 : string;
  step3 : string;
  step4 : string;

  //Tab
  niveaux = [];
  formationsTab = [];

  expanded = false;

  //Model

  coursCommun : CoursCommunModel = {} ;
  lieuInterventionModel : LieuInterventionModel = {} ;
  publicCibleMdel : publicCibleModel = {} ;
  publicCibleMdels : publicCibleModel[] = [] ;




  publicCibleMdelsToSend = {

    idCoursCommun : null,
    publicCible : [],

  }



  constructor(
    private dialogRef: MatDialogRef<OganiserCoursSheetComponent>,
    private formBuilder: FormBuilder,
    private formationService : FormationService,
    private niveauService : NiveauService

  ) {

    dialogRef.disableClose = true ;
    dialogRef.backdropClick().subscribe( () => {
      dialogRef.close();
    })

    this.step = 'step1';

   }

  ngOnInit() {

    this.onFetchFormations();
    this.onFetchNiveau();
   
    this.initFormCoursCommun();
    this.initLieuInterventionForm();
    this.initPublicVise();

  }


  initFormCoursCommun(){

    this.coursCommunForm = this.formBuilder.group(

     {
       id : [''],
       titre : ['', Validators.required],
       organisation : ['', Validators.required],
       numeroTelephone : ['', Validators.required],
       dateDebut :  ['', Validators.required],
       dateFin  : ['', Validators.required],
       description  : ['', Validators.required],

     }

    )
  }

  initPublicVise(){
    this.publicCibleForm = this.formBuilder.group(

      {
          id : [''],
          idCoursCommun : [''],
          niveau : ['', Validators.required],
          cout : ['', Validators.required],
          formations : new FormArray([]),
      }
    )
  }

  initLieuInterventionForm(){
    this.lieuInterventionForm = this.formBuilder.group(

      {
        id : [''],
        idCoursCommun : [''],
        longitude : [''],
        latitude : [''],
        libelle : ['']
      }

    )
  }

 

 showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!this.expanded) {
    checkboxes.style.display = "block";
    this.expanded = true;
  } else {
    checkboxes.style.display = "none";
    this.expanded = false;
  }
}
  

  next() {

    if (this.step === 'step1') {
        console.log(this.coursCommun);
        
        this.goToStep2();

    } 
    
    else if (this.step === 'step2') {
    
      console.log(this.publicCibleMdels);

      this.goToStep3() ;

  
    }
    
    else if (this.step === 'step3') {
     
      console.log(this.lieuInterventionModel);


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

    $("#nextButton").addClass("hide");
  }


  addPublicToTable(){

    this.publicCibleMdels.push(this.publicCibleMdel);

  }

  onFetchNiveau(){

    this.niveauService.fetchNiveaux().subscribe(

      (resp)=>{

        
        this.niveaux = resp ;

      },


      (error)=>{

        console.log(error);
        
      },

    )

  }


  onFetchFormations(){

    this.formationService.onFetchFormations().subscribe(

      (resp)=>{
        
        this.formationsTab = resp ;

      },


      (error)=>{

        console.log(error);
        
      },

    )

  }

}
