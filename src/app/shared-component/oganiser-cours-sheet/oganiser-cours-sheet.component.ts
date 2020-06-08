import { URL } from 'src/app/API_url/config';
import { FiliereService } from './../../admin/services/filiere.service';
import { SnackbarService } from './../services/snackbar.service';
import { startWith, map,expand } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { OrganisationService } from './../../admin/services/organisation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { NiveauService } from './../../admin/services/niveau.service';
import { FormationService } from './../../admin/services/formation.service';
import { publicCibleModel } from './../../home/models/publiccible';
import { LieuInterventionModel } from './../../home/models/lieuintervention';
import { CoursCommunModel } from './../../home/models/courscommun';
import { FormBuilder, FormGroup, Validators, Form, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import * as $ from 'jquery';
import { CompressorService } from 'src/app/customers/services/CompressorService';

declare var $: any;

@Component({
  selector: 'app-oganiser-cours-sheet',
  templateUrl: './oganiser-cours-sheet.component.html',
  styleUrls: ['./oganiser-cours-sheet.component.scss']
})
export class OganiserCoursSheetComponent implements OnInit {

  // initial center position for the map
  initialLat: number = 5.338390;
  initialLng: number = 7.815982;

  //Boolean
  isCheckPublicCible = false ;
  isCheckIllimite = true ;
  isCheckIllimitePublicCible = true ;
  isModify = false ;

  //COnst
  idCoursCommun : number ;
  libelleLieu : string ;
  currentIndex : number = undefined ;
  urlFile;
  urlServer = URL.getLogoCoursCommun;
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
  filieres = [];

  expanded = false;

  //Model

  coursCommun : CoursCommunModel = {} ;
  lieuInterventionModel : LieuInterventionModel = {} ;
  publicCibleMdel : publicCibleModel = {} ;
  publicCibleMdels : publicCibleModel[] = [] ;
error:String;
  formationsModel = [];
  niveauModel = {};
  data: FileList;
  compressedImages = [];


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
    private snackBar: SnackbarService,
    private filiereService : FiliereService,
    private compressor: CompressorService

  ) {
   

    this.step = 'step1';

   }

   //For autocomplete
  filteredOrganisations: Observable<any[]>;
  filteredFilieres: Observable<any[]>;



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
    this.onFetchFileres();
    
    this.filteredOrganisations = this.coursCommunForm.get('organisation').valueChanges.pipe( 
      startWith(''),
      map(value => this._filterOrganisations(value))
    );

    this.filteredFilieres = this.publicCibleForm.get('filiere').valueChanges.pipe( 
      startWith(''),
      map(value => this._filterFiliere(value))
    );
    
    
    console.log(this.dataReceived);
    
       

    if(this.dataReceived.coursCommun){


      this.idCoursCommun = this.dataReceived.coursCommun.id ;

      //Recuperation de la photo
      this.urlFile = this.urlServer +"/" + this.idCoursCommun ;


      //Mode modification activé      

     //Si on est en attente d'une mise en ligne alors c'est pour une modification
     //Sinon c'est pour on est toujours en mode édition
      if(this.dataReceived.coursCommun.attenteMiseEnLigne
        || this.dataReceived.coursCommun.enLigne 
        || this.dataReceived.coursCommun.refusMiseEnLigne ||
        this.dataReceived.coursCommun.suppressionMiseEnLigne){

        this.isModify = true ;

          //Si le cout commun est précisé
          if(this.dataReceived.coursCommun.cout !== null){

            this.isCheckPublicCible = false;
          }else{
            this.isCheckPublicCible = true;

          }

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
        description  : data.coursCommun.description,
        
      }
    )

  

    //Si le cours commun est précisé
    
    if(data.coursCommun.cout !== null){

      this.coutGeneralForm.patchValue(
        {
          id : this.idCoursCommun,
          cout : data.coursCommun.cout,
          nbreMaxInscrits : data.coursCommun.nbreMaxInscrits
        
        }
      )

      //On active le check box illimité pour le cout général
      if(data.coursCommun.nbreMaxInscrits !=0){
        this.isCheckIllimite = !this.isCheckIllimite;
      }


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
          niveau : [null, Validators.required],
          cout : ['', Validators.required],
          formations : new FormControl(null, Validators.required),
          nbreMaxInscrits : [''],
          filiere : [null]
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
        

    if(this.currentIndex !== undefined){
      
      this.publicCibleMdels.splice(this.currentIndex,1,this.publicCibleForm.value);

    }else{
      this.publicCibleMdels.push(this.publicCibleForm.value);

    }

    this.currentIndex = undefined ;
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

  onFetchFileres(){

    this.filiereService.fetchFilieres().subscribe(

      (resp)=>{

        
        this.filieres = resp.response ;
        
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

        this.error = resp['error'];
        if(!this.error)
        {
          this.next();
        }
       
        
      },

      (error)=>{
        console.log(error);
        
      }
    )

  }


  ajoutMarqueur(lat : number, lng : number) {
     
    
    this.lat = lat ;
    this.lng = lng ;
    
  }


  //Recuperer criterRecherche dans l'URL
  getParameterUrl() { 
      
     this.route.queryParams.subscribe(params => {
        
      this.idCoursCommun = params['courscommunedit'];
            });  

      this.urlFile = this.urlServer +"/" + this.idCoursCommun ;

      }

  /*
  * Assignation du lieu d'intervention
  */

  setAddress(adress){
    
    this.lieuInterventionForm.get('libelle').setValue(adress.formatted_address);
  
    this.lat = adress['geometry'].location.lat() ;
    this.lng = adress['geometry'].location.lng() ;

    

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

  loadPublicCible(publicCible, index){

    this.currentIndex = index ;    

    this.publicCibleForm.patchValue({

      id : publicCible.id,
      cout : publicCible.cout,
      nbreMaxInscrits : publicCible.nbreMaxInscrits,
      niveau : publicCible.niveau,
      formations : publicCible.formations,
      filiere : publicCible.filiere
    })

    if(publicCible.nbreMaxInscrits){
      this.isCheckIllimitePublicCible = false; 
    }
    
  }


    //Pour l'autocomplétin Organisation
    private _filterOrganisations(value: string): string[] {
    
      const filterValue = this._normalizeValue(value);
      return this.organisations.filter(organisation => this._normalizeValue(organisation.libelle).includes(filterValue));
    }
  

        //Pour l'autocomplétin Filiere
     private _filterFiliere(value: string): string[] {
    
          const filterValue = this._normalizeValue(value);
          return this.filieres.filter(filiere => this._normalizeValue(filiere.libelle).includes(filterValue));
        }
      
        private _normalizeValue(value: string): string {
      
          return value.toLowerCase().replace(/\s/g, '');
        }
     
 

    demanderMiseEnLigne(id){
      this.coursCommunService.demandeMiseEnLigne(id)
      .subscribe(
        (response)=>{

          this.snackBar.openSnackBar("Soumis avec succès !")
          this.dialogRef.close();
        },
        (error)=>{
          console.log("Erreur : "+error);
        }
      )
  
    }
  

    checkBoxIllimiteChange(){


      this.isCheckIllimite = !this.isCheckIllimite;
      
      if(this.isCheckIllimite == true){
        this.coutGeneralForm.get('nbreMaxInscrits').patchValue("");
        this.publicCibleForm.updateValueAndValidity();

      }

    }


    checkBoxIllimiteChangePublicCible(){

      this.isCheckIllimitePublicCible = !this.isCheckIllimitePublicCible;
      
      if(this.isCheckIllimitePublicCible === true){
        this.publicCibleForm.get('nbreMaxInscrits').patchValue("");
        this.publicCibleForm.updateValueAndValidity();

      }

    }

    comparer(o1: any, o2: any): boolean {
      return o1 && o2 ? o1.libelle === o2.libelle : o1 === o2;
    }
  ///Compress File

recursiveCompress = (image: File, index, array) => {
  return this.compressor.compress(image).pipe (
    map(response => {

    //Code block after completing each compression
      console.log('compressed ' + index + image.name);
      this.compressedImages.push(response);
      return {
        data: response,
        index: index + 1,
        array: array,
      };
    }),
  );
}

    // onSelectFile(event) {
    //   if (event.target.files && event.target.files[0]) {
    //     var reader = new FileReader();
  
    //     reader.readAsDataURL(event.target.files[0]); 
  
    //     //Apercu
    //     reader.onload = (event) => {
    //       this.urlFile = reader.result ;
    //     }
  
    //     //Envoie au serveur
    //      this.saveLogoCoursCommun(event.target.files[0]);
    //   }

      
    // }
    onSelectFile(event) {
      if(event.target.files.length > 0) {
        this.data = event.target.files;
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); 
  
        //Apercu
        reader.onload = (event) => {
          this.urlFile = reader.result ;
        }
          console.log('input: '  + this.data[0].size);
          const compress = this.recursiveCompress( this.data[0], 0, this.data ).pipe(
            expand(res => {
              return res.index > res.array.length - 1
                ? EMPTY
                : this.recursiveCompress( this.data[res.index], res.index, this.data );
            }),
          );
          compress.subscribe(res => {
            if (res.index > res.array.length - 1) {
            //Code block after completing all compression
              console.log('Compression successful ' + this.compressedImages);
              let file = this.compressedImages[0];
  
              let input = new FormData();
              if(this.data[0].size>512000)
              {
                input.append('logo',file);
              }
              else
              {
                input.append('logo',this.data[0]);
              }
              input.append('idCoursCommun', this.idCoursCommun.toString());
              this.saveLogoCoursCommun(input);
             
            }
          });
              }
    }


    saveLogoCoursCommun(data:FormData){
      

      // let formData = new FormData();

      // formData.append('idCoursCommun', this.idCoursCommun.toString());
      // formData.append('picture', pictureData);

      this.coursCommunService.saveLogoCoursCommun(data).subscribe(

        (resp)=>{

          console.log(resp);
          
        },

        (error)=>{

          console.log(error);
          
        }
      )

    }

} 
