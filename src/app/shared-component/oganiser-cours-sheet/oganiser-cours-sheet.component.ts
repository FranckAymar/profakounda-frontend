import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrganisationService } from './../../admin/services/organisation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { NiveauService } from './../../admin/services/niveau.service';
import { Niveau } from './../../admin/model/niveau.model';
import { FormationService } from './../../admin/services/formation.service';
import { publicCibleModel } from './../../home/models/publiccible';
import { LieuInterventionModel } from './../../home/models/lieuintervention';
import { CoursCommunModel } from './../../home/models/courscommun';
import { FormBuilder, FormGroup, Validators, Form, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import * as $ from 'jquery';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

declare var $: any;

@Component({
  selector: 'app-oganiser-cours-sheet',
  templateUrl: './oganiser-cours-sheet.component.html',
  styleUrls: ['./oganiser-cours-sheet.component.css']
})
export class OganiserCoursSheetComponent implements OnInit {

  // initial center position for the map
  initialLat: number = 5.338390;
  initialLng: number = 7.815982;

  //Boolean
  isCheckPublicCible = false ;
  isNotCheckIllimite = false ;
  isNotCheckIllimitePublicCible = false ;
  isModify = false ;

  //COnst
  idCoursCommun : number ;
  libelleLieu : string ;

  //FormGroup
  coursCommunForm : FormGroup;
  publicCibleForm : FormGroup;
  lieuInterventionForm : FormGroup ;
  formationsListControl = new FormControl();
  coutGeneralForm : FormGroup ;

  //Variable for map

  lat: number =   5.3176661 ;
  lng: number = -4.0899911 ;
  zoom : number = 15 ; 

  step : string ;
  step1 : string;
  step2 : string;
  step3 : string;
  step4 : string;

  //Tab
  niveaux = [];
  formationsTab = [];
  organisations = [];

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
    private organisationService : OrganisationService,
    private coursCommunService : CoursCommunService,
    @Inject(MAT_DIALOG_DATA) public dataReceived: any,
    private route : ActivatedRoute,
    private router : Router,
    private snackBar: MatSnackBar

  ) {
   

    this.step = 'step1';

   }

  filteredOrganisations: Observable<any[]>;



  ngOnInit() {

    //Initialisation des params
    this.initFormCoursCommun();
    this.initLieuInterventionForm();
    this.initCoutGeneral();
    this.initPublicVise();
        
    //Recuperation du param
    this.getParameterUrl();


    //
    this.onFetchFormations();
    this.onFetchNiveau();
    this.onFetchOrganisation(); 
    
    this.filteredOrganisations = this.coursCommunForm.get('organisation').valueChanges.pipe( 
      startWith(''),
      map(value => this._filter(value))
    );
    
       

    if(this.dataReceived.coursCommun){

      this.idCoursCommun = this.dataReceived.coursCommun.id ;

      //Mode modification activé
      this.isModify = true ;

      //Si le cout commun est précisé
      if(this.dataReceived.coursCommun.cout !== null){

        this.isCheckPublicCible = false;
      }else{
        this.isCheckPublicCible = true;

      }

      this.initializeInput(this.dataReceived);

    }

  }


  initializeInput(data){

    
    this.coursCommunForm.patchValue(

      {
        id : data.coursCommun.id,
        titre : data.coursCommun.titre,
        idOrganisation : data.coursCommun.organisation.id,
        organisation :data.coursCommun.organisation.libelle,
        telephone : data.coursCommun.telephone,
        dateDebut :  data.coursCommun.dateDebut,
        dateFin  : data.coursCommun.dateFin,
        description  : data.coursCommun.description
        
      }
    )

    //Si le cours commun est précisé
    
    if(data.coursCommun.cout !== null){

      
      this.coutGeneralForm.patchValue(
        {
          id : this.idCoursCommun,
          cout : data.coursCommun.cout 
        }
      )
    }else{

      this.coutGeneralForm.patchValue(


        {
          cout : 'null',
        }
      )

      this.publicCibleMdels = data.publicCible ;


    }

    
    this.lieuInterventionForm.patchValue(

      {
        id : data.lieuIntervention.id,
        longitude : data.lieuIntervention.longitude,
        latitude :  data.lieuIntervention.latitude,
        libelle :  data.lieuIntervention.libelle,

      }

    )

   
    

    this.lat =  data.lieuIntervention.latitude ;
    this.lng =  data.lieuIntervention.longitude;
    this.libelleLieu = data.lieuIntervention.libelle;
  }




  initFormCoursCommun(){

    this.coursCommunForm = this.formBuilder.group(

     {
       id : [''],
       idOrganisation : [''],
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
       nbreMaxInscrits : [''],  
     }

    )
  }

  initPublicVise(){
    this.publicCibleForm = this.formBuilder.group(

      {
          id : new FormControl(),
          niveau : ['', Validators.required],
          cout : ['', Validators.required],
          formations : new FormControl('', Validators.required),
          nbreMaxInscrits : ['']
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

    $("#nextButton").addClass("hide");
  }


  addPublicToTable(){
    
    this.publicCibleMdels.push(this.publicCibleForm.value);
    
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

  onFetchOrganisation(){

    this.organisationService.fetchOrganisations().subscribe(

      (resp)=>{
        
        console.log(resp);
        
        this.organisations = resp ;

      },


      (error)=>{

        console.log(error);
        
      }

    )

  

    

  }

  deletePublic(index){

    this.publicCibleMdels.splice(index, 1);

  }

  savePublicCible(){


    //Si le cout général est précisé 
    if(this.coutGeneralForm.get('cout').value !== 'null'){

      this.coutGeneralForm.get('id').setValue(this.idCoursCommun);
      //Si le cout général est précisé on le sauvegarde
      this.saveCoutGeneral();

      return ;
    }

    this.publicCibleMdelsToSend.idCoursCommun = this.idCoursCommun,
    this.publicCibleMdelsToSend.publicCible = this.publicCibleMdels ;
    

    //Sinon on sauvegarde le public cible
    this.coursCommunService.savePublicVise(this.publicCibleMdelsToSend).subscribe(


      (resp)=>{
        this.next();
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }


   /*
  * Sauvegarde du lieu d'intervention
  */


  saveLieuIntervention(){


    this.lieuInterventionForm.get('idCoursCommun').setValue(this.idCoursCommun);
    this.lieuInterventionForm.get('latitude').setValue(this.lat);
    this.lieuInterventionForm.get('longitude').setValue(this.lng);
   
    this.coursCommunService.saveLieuIntervention(this.lieuInterventionForm.value).subscribe(


      (resp)=>{
        this.demanderMiseEnLigne(this.idCoursCommun);

      },
      (error)=>{
        console.log(error);
        
      }
    )


    
  
  }

  saveCoursCommun(){

    this.coursCommunService.saveCoursCommun(this.coursCommunForm.value).subscribe(


      (resp)=>{

        if(resp['error']){
          console.log(resp);
          
        }else{

          this.idCoursCommun = resp.id ;
          this.next();
        }
       
        
      },
      (error)=>{
        console.log(error);
        
      }
    ) ;
    
  }


  /*
  * Modification du cout général
  */

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


  ajoutMarqueur(lat : number, lng : number) {
     
    console.log(lat);
    
    this.lat = lat ;
    this.lng = lng ;
    
  }


  //Recuperer criterRecherche dans l'URL
  getParameterUrl() { 
      
     this.route.queryParams.subscribe(params => {
        
      this.idCoursCommun = params['courscommunedit'];
            });  
      }

  /*
  * Assignation du lieu d'intervention
  */

  setAddress(adress){
    
    this.lieuInterventionForm.get('libelle').setValue(adress.formatted_address);
  
    this.lat = adress['geometry'].location.lat() ;
    this.lng = adress['geometry'].location.lng() ;

    console.log(this.lat + "/" +this.lng);
    

  }


  getFormationsForPublic(publicCible) : string{
    

    let formation = "";

    publicCible.formations.forEach(element => {
      
      let libelle = element.libelle ;

      if(formation ==""){
        formation = libelle;
      }else{
        formation = (formation + "/").concat(libelle)

      }

    });

    return formation ;
    

  }

  loadPublicCible(publicCible){


    this.publicCibleForm.patchValue({

      id : publicCible.id,
      niveau : publicCible.niveau,
      cout : publicCible.cout,
      formations : publicCible.formations


    })


  }


  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

    //Pour l'autocomplétin
    private _filter(value: string): string[] {
    
      const filterValue = this._normalizeValue(value);
      return this.organisations.filter(organisation => this._normalizeValue(organisation.libelle).includes(filterValue));
    }
  
    private _normalizeValue(value: string): string {
  
      return value.toLowerCase().replace(/\s/g, '');
    }
 

    demanderMiseEnLigne(id){
      this.coursCommunService.demandeMiseEnLigne(id)
      .subscribe(
        (response)=>{

          this.openSnackBar("Soumis avec succès !")
          this.dialogRef.close();
        },
        (error)=>{
          console.log("Erreur : "+error);
        }
      )
  
    }
  

    checkBoxIllimiteChange(){


      this.isNotCheckIllimite = !this.isNotCheckIllimite;
      
      if(this.isNotCheckIllimite == false){
        this.coutGeneralForm.get('nbreMaxInscrits').patchValue("");
        this.publicCibleForm.updateValueAndValidity();

      }

    }


    checkBoxIllimiteChangePublicCible(){

      this.isNotCheckIllimitePublicCible = !this.isNotCheckIllimitePublicCible;
      
      if(this.isNotCheckIllimitePublicCible === false){
        this.publicCibleForm.get('nbreMaxInscrits').patchValue("");
        this.publicCibleForm.updateValueAndValidity();

      }

    }
  

}
