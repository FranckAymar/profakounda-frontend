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

@Component({
  selector: 'app-proposition-formation',
  templateUrl: './proposition-formation.component.html',
  styleUrls: ['./proposition-formation.component.css']
})

export class PropositionFormationComponent implements OnInit {

  public model: Niveau;
  @Input() edit:boolean = false;
  @Input() editModule:boolean = false;
  joursString:any = [];
  niveaux=[];
  descriptionHasChange:boolean = false;
  niveauxEnseignes: any = [];
  disponibilites: any = [];
  modules: any = [];
  hours: any = [];
  jours: any = [];
  propositions: any = [];
  formations: any = [];
  heure:Heure = new Heure('','');
  lambda:Lambda;
  @Input() propositionFormation:PropositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME)); ;
  @Input() numberOfTable:number;
  disponibilite:Disponibilite = new Disponibilite('',[],null,sessionStorage.getItem(this.signInService.USERNAME));
  proposition:PropositionFormation= new PropositionFormation(0,'','',this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
  niveauForme:NiveauForme = new NiveauForme(0,'',null,null,null,sessionStorage.getItem(this.signInService.USERNAME)); ;
  module:Module = new Module(0,'',null,sessionStorage.getItem(this.signInService.USERNAME));;
  propostionLoad = {} ;
  //Variable for map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius : number = 1000
  zoom : number = 15 ; 
  errorNiveaux:string;
  errorModule:string;
  errorProposition:string;
  errorJour:string;
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  coordMapModel : CoordMapModel ;
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;

  constructor(private signInService:SignInService,
    private niveauService:NiveauService,
    private jourService:JourService,
    private propositionFormationService:PropositionFormationService,
    private formationService:FormationService
    ) { 
      
    }

    
  ngOnInit() {
    this.onFetchNiveaux();
    this.rechercherProposition();
    this.onFetchFormations();
    this.onFetchJoursString();
    
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
    adProposition(){
      this.errorProposition = "";
      this.propositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
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
      this.niveauForme = new NiveauForme(0,'',null,null,id,sessionStorage.getItem(this.signInService.USERNAME));
    }
    addHour(){
      this.hours.push(this.heure);
      this.heure = new Heure('','');
    }
    getProposition(proposition){
      this.descriptionHasChange = false;
      this.errorProposition = "";
      this.propositionFormation = new PropositionFormation(proposition.id,proposition.description,proposition.telephone,this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
     
    }
    addDisponibilite(id){
      this.proposition= new PropositionFormation(id,'','',this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
      this.rechercherDisponibilite(id);
     
     }
     rechercherDisponibilite(id){
this.propositionFormationService.rechercherDisponibilites(id)
    .subscribe(
      (response)=>{
        this.disponibilites = response;
        this.disponibilite = new Disponibilite('',[],id,sessionStorage.getItem(this.signInService.USERNAME));
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
     }
    addModule(m,id){
      this.editModule = false;
      this.modules = m;
      this.module = new Module(0,'',id,sessionStorage.getItem(this.signInService.USERNAME));
      console.log(this.module);
    }
    
    enregistrerProposition(){
        if(this.propositionFormation.id !=0)
        {
          this.proposition= new PropositionFormation(this.propositionFormation.id,this.propositionFormation.description,this.propositionFormation.telephone,this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
          this.propositionFormationService.modifierProposition(this.proposition)
          .subscribe(
            (response)=>{
              this.errorProposition = response["error"];
              if(!this.errorProposition)
              {
                alert("modification effectuée avec succès.");
                document.getElementById('ajouterDescription').click();
                this.propositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
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
            this.propositionFormation = new PropositionFormation(0,'','',this.descriptionHasChange,sessionStorage.getItem(this.signInService.USERNAME));
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
    if(!this.edit)
    {
  
      this.propositionFormationService.onSaveNiveauEnseigne(object)
    .subscribe(
      (response)=>{
        this.errorNiveaux = response['error'];
        if(!this.errorNiveaux)
        {
          this.niveauForme = new NiveauForme(0,'',null,null,0,sessionStorage.getItem(this.signInService.USERNAME));
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
          this.niveauForme = new NiveauForme(0,'',null,null,0,sessionStorage.getItem(this.signInService.USERNAME));
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
    if(!this.editModule)
    {
        this.propositionFormationService.onSaveModule(data)
      .subscribe(
        (response)=>{
          this.errorModule = response['error'];
          this.modules = response['modules'];
          if(!this.errorModule)
          {
            this.module = new Module(0,'',response["propositionId"],sessionStorage.getItem(this.signInService.USERNAME));
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
            this.module = new Module(0,'',response["propositionId"],sessionStorage.getItem(this.signInService.USERNAME));
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
        this.niveauForme = new NiveauForme(response['id'],response['niveau'],response['prixMin'],response['prixMax'],response['propositionId'],sessionStorage.getItem(this.signInService.USERNAME))
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
        this.module = new Module(response['id'],response['designation'],response['propositionId'],sessionStorage.getItem(this.signInService.USERNAME));
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
    this.lambda = new Lambda(dayId,sessionStorage.getItem(this.signInService.USERNAME),this.proposition.id);
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
        this.module = new Module(0,'',response['propositionId'],sessionStorage.getItem(this.signInService.USERNAME));
        this.modules = response['modules'];
        this.onFetchFormations();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }

  
  rechercherProposition(){
    this.propositionFormationService.rechercherProposition(sessionStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (response)=>{
        
        this.propositions = response;
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }

  modifierDescription(){
    this.propositionFormation.description = this.proposition.description;
    this.propositionFormation.id = this.proposition.id;
    this.proposition.username = sessionStorage.getItem(this.signInService.USERNAME);
  }
 
  onSaveDisponibilite(data){
    this.disponibilite.heure = this.hours;
    this.propositionFormationService.onSaveDisponibilte(this.disponibilite)
    .subscribe(
      (response)=>{
        this.errorJour = response["error"];
        // this.disponibilite = new Disponibilite('',[],response["propositionId"],sessionStorage.getItem(this.signInService.USERNAME));
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

}
