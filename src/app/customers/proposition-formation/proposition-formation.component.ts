import { CoordMapModel } from './../models/CoordModel';
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NiveauForme } from '../models/NiveauForme.model';
import { Module } from '../models/formation.model';
import { Disponibilite } from '../models/Disponibite.model';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { PropositionFormationService } from '../services/propositionFormation.service';
import { Niveau } from 'src/app/admin/model/niveau.model';
import { Jour } from '../models/jour.model';
import { Heure } from '../models/heure.model';
import { PropositionFormation } from '../models/PropositionFormation.model';
import { Lambda } from '../models/lambda.model';
import { trigger } from '@angular/animations';
import { JourService } from '../services/Jour.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormationService } from 'src/app/admin/services/formation.service';
import { ParticulierService } from '../services/particulier.service';
import { VilleService } from 'src/app/admin/services/ville.service';
import { DemandeMiseEnLigne } from '../models/DemandeMiseEnLigne';
import { CommuneService } from 'src/app/admin/services/commune.service';

@Component({
  selector: 'app-proposition-formation',
  templateUrl: './proposition-formation.component.html',
  styleUrls: ['./proposition-formation.component.css']
})

export class PropositionFormationComponent implements OnInit {

  public model: Niveau;
  @Input() edit:boolean = false;
  @Input() editModule:boolean = false;
  @Input() isVilleExist:boolean;
  joursString:any = [];
  id:number;
  alMod:boolean = false;
  alNiv:boolean = false;
  isNombreMinValid:boolean = false;
  isNombreMaxValid:boolean = false;
  isPresentDoubleNumber:boolean = false;
  nombreMin:number;
  nombreMax:number;
  niveaux=[];
  descriptionHasChange:boolean = false;
  niveauxEnseignes: any = [];
  disponibilites: any = [];
  modules: any = [];
  hours: any = [];
  jours: any = [];
  villes:any = [];
  @Input() isAllModule:boolean =false;
  @Input() isAllNiveaux:boolean =false;
  @Input() ville:string;
  @Input() commune:string;
  propositions: any = [];
  formations: any = [];;
  communes:any = []
  heure:Heure = new Heure('','');
  lambda:Lambda;
  isCheckCiclePrimaire= false ;
  @Input() propositionFormation:PropositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME)); ;
  @Input() numberOfTable:number;
  demandeMiseEnLigne:DemandeMiseEnLigne;
  
  disponibilite:Disponibilite = new Disponibilite('',[],null,localStorage.getItem(this.signInService.USERNAME));
  proposition:PropositionFormation= new PropositionFormation(0,'','',this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
  niveauForme:NiveauForme = new NiveauForme(0,'',null,null,null,localStorage.getItem(this.signInService.USERNAME)); ;
  module:Module = new Module(0,'',null,localStorage.getItem(this.signInService.USERNAME));;
  propostionLoad = {} ;
  //Variable for map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius : number = 1000
  zoom : number = 15 ; 
  errorNiveaux:string;
  errorModule:string;
  isVille:boolean = true;
  errorProposition:string;
  errorJour:string;
  filteredOptions4: Observable<string[]>
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControl4 = new FormControl();
  myControlCommune = new FormControl();
  coordMapModel : CoordMapModel ;
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  filteredOptionsCommunes: Observable<string[]>;

  constructor(private signInService:SignInService,
    private niveauService:NiveauService,
    private jourService:JourService,
    private communeService:CommuneService,
    private particulierService:ParticulierService,
    private villeService:VilleService,
    private propositionFormationService:PropositionFormationService,
    private formationService:FormationService
    ) { 
      
    }

    
  ngOnInit() {
    this.onFetchNiveaux();
    this.rechercherProposition();
    this.onFetchFormations();
    this.onFetchJoursString();
    this.onFetchVillesObject();
    this.verifierVilleParticulier();
    // this.onFetchCommunes();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
      map(val => this._filter2(val))
    );
    this.filteredOptions3 = this.myControl3.valueChanges
    .pipe(
      startWith(''),
      map(va => this._filter3(va))
    );
    this.filteredOptionsCommunes = this.myControlCommune.valueChanges
    .pipe(
      startWith(''),
      map(va => this._filterCommunes(va))
    );
    this.filteredOptions4 = this.myControl4.valueChanges
    .pipe(
      startWith(''),
      map(v => this._filter4(v))
    );
    }
    private _filter4(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.villes.filter(option => option.designation.toLowerCase().includes(filterValue));
    }
    private _filterCommunes(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.communes.filter(option => option.libelle.toLowerCase().includes(filterValue));
    }
    
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.joursString.filter(option => option.toLowerCase().includes(filterValue));
    }
    private _filter2(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.formations.filter(option => option.toLowerCase().includes(filterValue));
    }
    private _filter3(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.niveaux.filter(option => option.toLowerCase().includes(filterValue));
    }
    changeDescritpion(){
      this.descriptionHasChange = true;
    }
    checkBoxCylePrimaire(){
      this.isCheckCiclePrimaire = !this.isCheckCiclePrimaire ;
      console.log(this.isCheckCiclePrimaire);
    }
    nombreMinChange(event){
      if(event < 0){
        this.isNombreMinValid = false;
      }
      else{
        this.isNombreMinValid = true;
        this.nombreMin = event;
      }
      this.validDoubleNumber();
     
    }
    villemousekeydown(){
      this.commune ="";
    }
    
    mouseleave(){
      
      if(this.myControl4.value===undefined || this.myControl4.value==="")
      {
        
        this.myControlCommune.value == "";
        this.commune =""
        this.isVille = false;
      }
      else{
        this.isVille =true;
      }
      
    }
    nombreMaxChange(event){
      if(event < 0){
        this.isNombreMaxValid = false;
      }
      else{
        this.isNombreMaxValid = true;
        this.nombreMax = event;
      }
      this.validDoubleNumber();
     
    }
    checkAllModuleChange(){
      this.isAllModule = !this.isAllModule;
    }
    checkAllNiveauxChange(){
      this.isAllNiveaux = !this.isAllNiveaux;
    }
    validDoubleNumber(){
      if((this.nombreMin && this.nombreMax) && (this.nombreMin<this.nombreMax)){
        this.isPresentDoubleNumber = true;
      }
      else
      {
        this.isPresentDoubleNumber = false;
      }
    }
    adProposition(){
      this.errorProposition = "";
      this.propositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
    }
    getMdemandemMiseEnLigneA(id:number){
      this.demandeMiseEnLigne = new DemandeMiseEnLigne(id,'','');
    }
    mousedown(){
      
      this.communeService.listCommunesParVille(this.ville).subscribe(
        (resp)=>{
          
          this.communes = resp;
        },
        (error)=>{
         
          
          this.communes = [];
        }
      )
      
    }
    saveDemandeMiseEnLigne(){
      this.demandeMiseEnLigne.ville = this.ville;
      this.demandeMiseEnLigne.commune = this.commune;
      this.propositionFormationService.demandeMiseEnLigneObject(this.demandeMiseEnLigne).subscribe(
        (response)=>{
          document.getElementById('showVilleModal').click();
          this.rechercherProposition();
          this.verifierVilleParticulier();
        },
        (error)=>{
          console.log(error);
        }
      )
   
    }
    onFetchFormations()
      {
       this.formationService.onFetchFormationsString().subscribe(
         (response)=>{
           
           this.formations = response;
         },
         (error)=>{
           console.log("Erreur de recuperation des formations: "+error);
         }
       )
      }
    onFetchJoursString()
  {
    this.jourService.onFetchJoursString()
    .subscribe(
      (response)=>{
        this.joursString = response;
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }
    addNiveau(id){
      this.edit = false;
      this.propositionFormationService.getAllAnivaux(id).subscribe(
        (resp)=>{
          if(resp['contrat']){
            this.isNombreMaxValid = true;
            this.isNombreMinValid = true;
            this.isPresentDoubleNumber = true;
            this.nombreMax = resp['contrat'].maxMontant;
            this.nombreMin = resp['contrat'].minMontant;
            this.niveauForme = new NiveauForme(resp['contrat'].id,'',resp['contrat'].minMontant,resp['contrat'].maxMontant,id,localStorage.getItem(this.signInService.USERNAME));
          }
          else
          {
            this.booleenParDefaut();
            this.niveauForme = new NiveauForme(0,'',null,null,id,localStorage.getItem(this.signInService.USERNAME));
          }
          this.isAllNiveaux = resp['allNiveau'];
          this.alMod = resp['allModule'];
        },
        (error)=>{
          console.log(error);
        }
      )
     
    }
    addHour(){
      this.hours.push(this.heure);
      this.heure = new Heure('','');
    }
    getProposition(proposition){
      this.descriptionHasChange = false;
      this.isCheckCiclePrimaire =proposition.cyclePrimaire;
      this.errorProposition = "";
      this.propositionFormation = new PropositionFormation(proposition.id,proposition.description,proposition.telephone,this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
     
    }
    verifierVilleParticulier(){
      this.particulierService.verifierVilleParticulier().subscribe(
        (response)=>{
          
          this.isVilleExist = response['isVilleExist'];
        
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    addDisponibilite(id){
      this.proposition= new PropositionFormation(id,'','',this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
      this.rechercherDisponibilite(id);
     
     }
     rechercherDisponibilite(id){
this.propositionFormationService.rechercherDisponibilites(id)
    .subscribe(
      (response)=>{
        this.disponibilites = response;
        this.disponibilite = new Disponibilite('',[],id,localStorage.getItem(this.signInService.USERNAME));
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
     }
    addModule(m,id,va,alNi){
      this.editModule = false;
      this.isAllModule = va;
      this.modules = m;
      this.id = id;
      this.alNiv = alNi;
      console.log(this.alNiv);
      this.module = new Module(0,'',id,localStorage.getItem(this.signInService.USERNAME));
    }
    
    onFetchVillesObject() {
      this.villeService.onFetchVilles().subscribe(
        (response)=> {
          this.villes = response;
          console.log(response);
        },
        (error)=> {
          console.log("Une erreur est survenue");
        }
  
      )
  
    }

    
    enregistrerProposition(){
        if(this.propositionFormation.id !=0)
        {
          this.proposition= new PropositionFormation(this.propositionFormation.id,this.propositionFormation.description,this.propositionFormation.telephone,this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
          this.propositionFormationService.modifierProposition(this.proposition)
          .subscribe(
            (response)=>{
              this.errorProposition = response["error"];
              if(!this.errorProposition)
              {
                alert("modification effectuée avec succès.");
                document.getElementById('ajouterDescription').click();
                this.propositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
                this.rechercherProposition();
              }
              
            },
            (error)=>{
              console.log("Erreur : "+error);
            }
          )
        }
        else{
          
          this.propositionFormationService.enregistrerProposition(this.propositionFormation)
      .subscribe(
        (response)=>{
          this.errorProposition = response["error"];
          if(!this.errorProposition)
          {
            this.propositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,localStorage.getItem(this.signInService.USERNAME));
           document.getElementById('addDesc').click();
            this.rechercherProposition();
          }
          
        },
        (error)=>{
          console.log("Erreur : "+error);
        }
      )
        }
      
    }
    booleenParDefaut(){
      this.isNombreMaxValid = false;
      this.isNombreMinValid = false;
      this.isPresentDoubleNumber = false;
    }

    

  onFetchNiveaux() {
    this.niveauService.fetchNiveauxString().subscribe(
      (response)=> {
        this.niveaux = response;
      },
      (error)=> {

        console.log("Une erreur est survenue");
        
      }

    )

  }
  onSaveLevelTeach(object){
    if(this.isAllNiveaux){
      console.log(object);
      console.log("Enregistrer tout les niveaux");
      this.propositionFormationService.addAllNiveaux(object).subscribe(
        (resp)=>{
          document.getElementById('niveauEnseigne').click();
          this.rechercherProposition();
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    else{
      this.saveNiveaux(object);
    }
  }
  saveNiveaux(object){
    if(!this.edit)
    {
      this.booleenParDefaut();
      this.propositionFormationService.onSaveNiveauEnseigne(object)
    .subscribe(
      (response)=>{
        this.errorNiveaux = response['error'];
        if(!this.errorNiveaux)
        {
         
          this.niveauForme = new NiveauForme(0,'',null,null,0,localStorage.getItem(this.signInService.USERNAME));
          document.getElementById('niveauEnseigne').click();
        }
        this.rechercherProposition();
        this.onFetchNiveaux();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
    }
    else
    {
      this.propositionFormationService.onUpdateNiveauEnseigne(object)
    .subscribe(
      (response)=>{
        this.errorNiveaux = response['error'];
        if(!this.errorNiveaux)
        {
          this.booleenParDefaut();
          this.niveauForme = new NiveauForme(0,'',null,null,0,localStorage.getItem(this.signInService.USERNAME));
          document.getElementById('niveauEnseigne').click();
        }
        this.rechercherProposition();
        this.onFetchNiveaux();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
    }
  }
  onSaveModule(data){
    if(this.isAllModule){
      this.propositionFormationService.addAllModule(this.id).subscribe(
        (resp)=>{
          this.rechercherProposition();
          
          this.isAllModule = false;
          document.getElementById('modules').click();
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    else{
      this.enregistrerModule(data);
    }
    
  }
  enregistrerModule(data){
    if(!this.editModule)
    {
        this.propositionFormationService.onSaveModule(data)
      .subscribe(
        (response)=>{
          this.errorModule = response['error'];
          this.modules = response['modules'];
          if(!this.errorModule)
          {
            this.module = new Module(0,'',response["propositionId"],localStorage.getItem(this.signInService.USERNAME));
          }
        this.onFetchFormations();
        this.rechercherProposition();
        },
        (error)=>{
          console.log("Erreur enregistrement du module : "+error);
        }
      )
    }
    else{
      this.propositionFormationService.onUpdateModule(data)
      .subscribe(
        (response)=>{
          this.errorModule = response['error'];
          this.modules = response['modules'];
          if(!this.errorModule)
          {
            this.module = new Module(0,'',response["propositionId"],localStorage.getItem(this.signInService.USERNAME));
            this.editModule = false;
          }
        this.onFetchFormations();
        this.rechercherProposition();
        },
        (error)=>{
          console.log("Erreur enregistrement du module : "+error);
        }
      )
    }
    
  }

  getContrat(id){
    this.edit = true;
    this.propositionFormationService.getContratById(id)
    .subscribe(
      (response)=>{
        this.onFetchNiveaux();
        this.niveauForme = new NiveauForme(response['id'],response['niveau'],response['prixMin'],response['prixMax'],response['propositionId'],localStorage.getItem(this.signInService.USERNAME))
        this.nombreMax = response['prixMax'];
        this.nombreMin = response['prixMin'];
        this.isNombreMaxValid = true;
        this.isNombreMinValid = true;
        this.isPresentDoubleNumber = true;
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }
  getModule(id){
    this.editModule = true;
    this.propositionFormationService.getModuleById(id)
    .subscribe(
      (response)=>{
        this.onFetchFormations();
        this.module = new Module(response['id'],response['designation'],response['propositionId'],localStorage.getItem(this.signInService.USERNAME));
        this.isAllModule = response['allModule'];
        console.log(response)
        console.log(this.isAllModule)
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }
  onFetchCommunes() {
    this.communeService.listCommunes().subscribe(
      (response)=> {
        this.communes = response;
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  mettreHorsLigne(id){
    this.propositionFormationService.demandeMiseEnHorsLigne(id)
    .subscribe(
      (response)=>{
        this.rechercherProposition();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  getMdemandemMiseEnLigne(id){
    this.propositionFormationService.demandeMiseEnLigne(id)
    .subscribe(
      (response)=>{
        this.rechercherProposition();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }

  deleteHour(id){
    this.propositionFormationService.deleteDisponibiliteByHour(id)
    .subscribe(
      (response)=>{
        this.rechercherDisponibilite(this.proposition.id);
        this.onFetchJoursString();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  deleteDay(dayId){
    this.lambda = new Lambda(dayId,localStorage.getItem(this.signInService.USERNAME),this.proposition.id);
    this.propositionFormationService.deleteDisponibiliteByDay(this.lambda)
    .subscribe(
      (response)=>{
        this.rechercherDisponibilite(this.proposition.id);
        this.onFetchJoursString();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }

  deleteContrat(id){
    this.edit = true;
    this.propositionFormationService.deleteContratById(id)
    .subscribe(
      (response)=>{
        this.rechercherProposition();
        this.onFetchNiveaux();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }

  deleteModule(id){
    this.propositionFormationService.deleteModuleById(id)
    .subscribe(
      (response)=>{
        this.module = new Module(0,'',response['propositionId'],localStorage.getItem(this.signInService.USERNAME));
        this.modules = response['modules'];
        this.onFetchFormations();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }

  
  rechercherProposition(){
    this.propositionFormationService.rechercherProposition(localStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (response)=>{
        this.propositions = response;
        console.log(response);
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }

  modifierDescription(){
    this.propositionFormation.description = this.proposition.description;
    this.propositionFormation.id = this.proposition.id;
    this.proposition.username = localStorage.getItem(this.signInService.USERNAME);
  }
 
  onSaveDisponibilite(data){
    this.disponibilite.heure = this.hours;
    this.propositionFormationService.onSaveDisponibilte(this.disponibilite)
    .subscribe(
      (response)=>{
        this.errorJour = response["error"];
        // this.disponibilite = new Disponibilite('',[],response["propositionId"],localStorage.getItem(this.signInService.USERNAME));
          this.hours =[];
        this.rechercherDisponibilite(response["propositionId"]);
        this.onFetchJoursString();
        this.rechercherProposition();
      
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  


  



  //Function for map

  ajoutMarqueur(lat : number, lng : number) {
     
    this.lat = lat ;
    this.lng = lng ;
    
  }

  
  setZoom(event) {
    
    this.zoom = event ;
    
  }

  changeRaduis(radius) {

    this.radius = radius ;
    
  }


  onSaveCoordMap() {

    this.coordMapModel  = new CoordMapModel(this.zoom, this.lat, this.lng , this.radius) ;

    this.propositionFormationService.saveCoordMap(this.coordMapModel, this.propostionLoad).subscribe(

      (resp) => {
          console.log(resp);
          this.rechercherProposition();
      },

      (error) => {

        console.log(error);
        
      }
    )


  }

  demandeMiseLigne(){


  }

  loadPropostion(id){
    this.propostionLoad = id ;
  }


  getAddress(place: object) { 


    let lat = place['geometry'].location.lat() ;
    let long = place['geometry'].location.lng() ;

    

    this.lat = lat;
    this.lng = long;

  }

}
