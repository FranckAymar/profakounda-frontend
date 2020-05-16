import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { NiveauService } from './../../admin/services/niveau.service';
import { Niveau } from './../../admin/model/niveau.model';
import { FormationService } from './../../admin/services/formation.service';
import { publicCibleModel } from './../../home/models/publiccible';
import { LieuInterventionModel } from './../../home/models/lieuintervention';
import { CoursCommunModel } from './../../home/models/courscommun';
import { FormBuilder, FormGroup, Validators, Form, FormArray, FormControl } from '@angular/forms';
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


  //Boolean
  isCheckPublicCible = false ;

  //COnst
  idCoursCommun : number ;

  //FormGroup
  coursCommunForm : FormGroup;
  publicCibleForm : FormGroup;
  lieuInterventionForm : FormGroup ;
  formationsListControl = new FormControl();
  coutGeneralForm : FormGroup ;

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
    private niveauService : NiveauService,
    private coursCommunService : CoursCommunService

  ) {
   

    this.step = 'step1';

   }

  ngOnInit() {

    this.onFetchFormations();
    this.onFetchNiveau();
   
    this.initFormCoursCommun();
    this.initLieuInterventionForm();
    this.initCoutGeneral();
    this.initPublicVise();


  }





  initFormCoursCommun(){

    this.coursCommunForm = this.formBuilder.group(

     {
       id : [''],
       titre : ['', Validators.required],
       organisation : ['', Validators.required],
       telephone : ['', Validators.required],
       dateDebut :  ['', Validators.required],
       dateFin  : ['', Validators.required],
       description  : ['', Validators.required],
       
     }

    )
  }

  initCoutGeneral(){

    this.coutGeneralForm = this.formBuilder.group(

     {
       id : [''],
       cout : ['', Validators.required],   
     }

    )
  }

  initPublicVise(){
    this.publicCibleForm = this.formBuilder.group(

      {
          id : [''],
          idNiveau : ['', Validators.required],
          cout : ['', Validators.required],
          formations : new FormControl('', Validators.required),
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


  checkBoxPublicChange(){

    this.isCheckPublicCible = !this.isCheckPublicCible ;


    this.initCoutGeneral();

    if(this.isCheckPublicCible == true){
      this.coutGeneralForm.get('cout').setValue('null')  ;
    }

    this.initPublicVise();
    this.publicCibleMdels = [];
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
    
    this.publicCibleMdels.push(this.publicCibleForm.value);
    console.log(this.publicCibleMdels);
    
    this.initPublicVise();

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


  deletePublic(index){

    this.publicCibleMdels.splice(index, 1);

  }

  savePublicCible(){

    if(this.coutGeneralForm.get('cout').value !== 'null'){

      this.coutGeneralForm.get('id').setValue(this.idCoursCommun);
      //Si le cout général est précisé on le sauvegarde
      this.saveCoutGeneral();

      return ;
    }

    console.log(this.publicCibleMdels);

    this.publicCibleMdelsToSend.idCoursCommun = this.idCoursCommun,
    this.publicCibleMdelsToSend.publicCible = this.publicCibleMdels ;
    console.log(this.publicCibleMdelsToSend);
    

    this.coursCommunService.savePublicVise(this.publicCibleMdelsToSend).subscribe(


      (resp)=>{
        console.log("OK enregistrépublic cible");
        console.log(resp);
        this.next();
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }


  saveLieuIntervention(){

    this.lieuInterventionForm.get('idCoursCommun').setValue(this.idCoursCommun);
    this.lieuInterventionForm.get('latitude').setValue(this.lat);
    this.lieuInterventionForm.get('longitude').setValue(this.lng);
   
    console.log(this.lieuInterventionForm.value);

    this.coursCommunService.saveLieuIntervention(this.lieuInterventionForm.value).subscribe(


      (resp)=>{
        console.log("OK enregistré Lileu intervention");
        console.log(resp);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )


    this.dialogRef.close();
    
  
  }

  saveCoursCommun(){
    console.log(this.coursCommunForm.value);
    
    this.coursCommunService.saveCoursCommun(this.coursCommunForm.value).subscribe(


      (resp)=>{

        if(resp['error']){
          console.log(resp);
          
        }else{

          console.log(resp);
          console.log(resp.id);
          this.idCoursCommun = resp.id ;
          this.next();
        }
       
        
      },
      (error)=>{
        console.log(error);
        
      }
    ) ;
    
  }


  setAddress(adress){
    this.lieuInterventionForm.get('libelle').setValue(adress.formatted_address);
    
    let lat = adress['geometry'].location.lat() ;
    let long = adress['geometry'].location.lng() ;

    this.lat = lat;
    this.lng = long;

  }


  saveCoutGeneral(){

    this.coursCommunService.modifierCoutGeneral(this.coutGeneralForm.value).subscribe(


      (resp)=>{

        console.log(resp);
        this.next();
        
      },

      (error)=>{
        console.log(error);
        
      }
    )

  }

}
