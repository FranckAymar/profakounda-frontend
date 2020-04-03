import { CoordMapModel } from './../models/CoordModel';
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NiveauForme } from '../models/NiveauForme.model';
import { Module } from '../models/formation.model';
import { Disponibilite } from '../models/Disponibite.model';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { PropositionFormationService } from '../services/propositionFormation.service';


@Component({
  selector: 'app-proposition-formation',
  templateUrl: './proposition-formation.component.html',
  styleUrls: ['./proposition-formation.component.css']
})
export class PropositionFormationComponent implements OnInit {

  @Input() edit:boolean = false;
  niveaux=[];
  niveauxEnseignes: any = [];
  disponibilites: any = [];
  niveauForme:NiveauForme = new NiveauForme(0,'',null,null,sessionStorage.getItem(this.signInService.USERNAME));
  module:Module = new Module('',sessionStorage.getItem(this.signInService.USERNAME));
  disponibilite:Disponibilite = new Disponibilite('','','',sessionStorage.getItem(this.signInService.USERNAME));
 
  //Variable for map

  lat: number = 5.338390;
  lng: number = -4.097748;
  radius : number = 1000
  zoom : number = 15 ; 
 

  coordMapModel : CoordMapModel ;

  constructor(private signInService:SignInService,
    private niveauService:NiveauService,
    private propositionFormationService:PropositionFormationService,
    ) { }

  ngOnInit() {
    this.onFetchNiveaux();
    this.onFetchLevelTeach();
    this.rechercherDisponibilte();
    }

    addNiveau(){
      this.edit = false;
      this.niveauForme = new NiveauForme(0,'',null,null,sessionStorage.getItem(this.signInService.USERNAME));
    }

  onFetchNiveaux() {
    this.niveauService.fetchNiveaux().subscribe(
      (response)=> {
        this.niveaux = response;
        console.log(response);
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
        this.niveauForme = new NiveauForme(0,'',null,null,sessionStorage.getItem(this.signInService.USERNAME));
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
        this.niveauForme = new NiveauForme(0,'',null,null,sessionStorage.getItem(this.signInService.USERNAME));
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
    this.propositionFormationService.onSaveModule(data)
    .subscribe(
      (response)=>{
       this.module = new Module('',sessionStorage.getItem(this.signInService.USERNAME));
        document.getElementById('modules').click();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }

  getContrat(id){
    this.edit = true;
    this.propositionFormationService.getContratById(id)
    .subscribe(
      (response)=>{
        this.niveauForme = new NiveauForme(response['id'],response['niveau'],response['prixMin'],response['prixMax'],sessionStorage.getItem(this.signInService.USERNAME))
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
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )
  }
  onSaveDisponibilite(data){
    this.propositionFormationService.onSaveDisponibilte(data)
    .subscribe(
      (response)=>{
        this.disponibilite = new Disponibilite('','','',sessionStorage.getItem(this.signInService.USERNAME));
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
