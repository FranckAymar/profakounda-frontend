import { CoordMapModel } from './../models/CoordModel';
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NiveauForme } from '../models/NiveauForme.model';
import { Module } from '../models/formation.model';
import { Disponibilite } from '../models/Disponibite.model';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { PropositionFormationService } from '../services/propositionFormation.service';

import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';
import { Niveau } from 'src/app/admin/model/niveau.model';
import { Observable } from 'rxjs';
import { Jour } from '../models/jour.model';
import { Heure } from '../models/heure.model';
import { PropositionFormation } from '../models/PropositionFormation.model';
import { Lambda } from '../models/lambda.model';

@Component({
  selector: 'app-proposition-formation',
  templateUrl: './proposition-formation.component.html',
  styleUrls: ['./proposition-formation.component.css']
})

export class PropositionFormationComponent implements OnInit {

  public model: Niveau;
  @Input() edit:boolean = false;
  @Input() editModule:boolean = false;
  niveaux=[];
  niveauxEnseignes: any = [];
  disponibilites: any = [];
  modules: any = [];
  hours: any = [];
  heure:Heure = new Heure('','');
  lambda:Lambda;
  @Input() propositionFormation:PropositionFormation = new PropositionFormation(0,'',sessionStorage.getItem(this.signInService.USERNAME)); ;
  @Input() numberOfTable:number;
  disponibilite:Disponibilite = new Disponibilite('',[],null,sessionStorage.getItem(this.signInService.USERNAME));
  proposition:PropositionFormation= new PropositionFormation(0,'',sessionStorage.getItem(this.signInService.USERNAME));
  niveauForme:NiveauForme = new NiveauForme(0,'',null,null,null,sessionStorage.getItem(this.signInService.USERNAME)); ;
  module:Module = new Module(0,'',null,sessionStorage.getItem(this.signInService.USERNAME));;
 
  //Variable for map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius : number = 1000
  zoom : number = 15 ; 
 

  coordMapModel : CoordMapModel ;

  constructor(private signInService:SignInService,
    private niveauService:NiveauService,
    private propositionFormationService:PropositionFormationService
    ) { 
      
    }

    
  ngOnInit() {
    this.onFetchNiveaux();
    this.onFetchLevelTeach();
    this.rechercherDisponibilte();
    this.rechercherModules();
    this.rechercherProposition();
    }
    addNiveau(){
      this.edit = false;
      this.niveauForme = new NiveauForme(0,'',null,null,this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
    }
    addHour(){
      this.hours.push(this.heure);
      this.heure = new Heure('','');
    }
    addProposition(){
     this.propositionFormation = new PropositionFormation(0,'',sessionStorage.getItem(this.signInService.USERNAME));
    }
    addDisponibilite(){
      this.disponibilite = new Disponibilite('',[],this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
     }
    addModule(){
      this.editModule = false;
      this.module = new Module(0,'',this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
    }
    
    enregistrerProposition(){
        if(this.propositionFormation.id !=0)
        {
          this.propositionFormationService.modifierProposition(this.propositionFormation)
          .subscribe(
            (response)=>{
              
              this.propositionFormation = new PropositionFormation(0,'',sessionStorage.getItem(this.signInService.USERNAME));
              this.rechercherProposition();
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
          
          this.propositionFormation = new PropositionFormation(0,'',sessionStorage.getItem(this.signInService.USERNAME));
          this.rechercherProposition();
        },
        (error)=>{
          console.log("Erreur : "+error);
        }
      )
        }
      
    }

    

  onFetchNiveaux() {
    this.niveauService.fetchNiveaux().subscribe(
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
        this.niveauForme = new NiveauForme(0,'',null,null,this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
        this.onFetchLevelTeach();
        document.getElementById('niveauEnseigne').click();

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
        this.niveauForme = new NiveauForme(0,'',null,null,this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
        this.onFetchLevelTeach();
        document.getElementById('niveauEnseigne').click();

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
        this.module = new Module(0,'',this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
        this.rechercherModules();
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
        this.module = new Module(0,'',this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
        this.editModule = false;
        this.rechercherModules();
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
        this.module = new Module(response['id'],response['designation'],response['propositionId'],sessionStorage.getItem(this.signInService.USERNAME));
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
        this.rechercherDisponibilte();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  deleteDay(id){
    this.lambda.id = id;
    this.lambda.username = sessionStorage.getItem(this.signInService.USERNAME);
    this.propositionFormationService.deleteDisponibiliteByDay(this.lambda)
    .subscribe(
      (response)=>{
        this.rechercherDisponibilte();
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
        this.onFetchLevelTeach();
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
        this.rechercherModules();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }

  onFetchLevelTeach(){
    this.propositionFormationService.onFetchLevelTeach(sessionStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (response)=>{
        this.niveauxEnseignes = response;
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  rechercherDisponibilte(){
    this.propositionFormationService.rechercherDisponibilites(sessionStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (response)=>{
        this.disponibilites = response;
        console.log(this.disponibilites);
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
  
        this.proposition = new PropositionFormation(response['id'],response['description'],sessionStorage.getItem(this.signInService.USERNAME));
       

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
  rechercherModules(){
    this.propositionFormationService.rechercherModules(sessionStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (response)=>{
        this.modules = response;
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  onSaveDisponibilite(data){
    this.disponibilite.heure = this.hours;
    this.propositionFormationService.onSaveDisponibilte(this.disponibilite)
    .subscribe(
      (response)=>{
        this.disponibilite = new Disponibilite('',[],this.proposition.id,sessionStorage.getItem(this.signInService.USERNAME));
        this.hours =[];
        this.rechercherDisponibilte();
      
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

    this.propositionFormationService.saveCoordMap(this.coordMapModel).subscribe(

      (resp) => {
          console.log(resp);
          
      },

      (error) => {

        console.log(error);
        
      }
    )


  }

}
