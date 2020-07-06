import { Component, OnInit } from '@angular/core';
import { InscriptioncourscommunService } from 'src/app/cours-commun/inscriptioncourscommun.service';
import { CoursCommunService } from '../services/cours-commun-service.service';
import { PropositionFormationService } from '../services/propositionFormation.service';
import { PaiementService } from 'src/app/formations/services/paiement.service';

@Component({
  selector: 'app-dashboard-customers',
  templateUrl: './dashboard-customers.component.html',
  styleUrls: ['./dashboard-customers.component.css']
})
export class DashboardCustomersComponent implements OnInit {

  constructor(private paiementService:PaiementService,private inscriptionService:InscriptioncourscommunService,private coursCommunService:CoursCommunService,private propositionService:PropositionFormationService) { }
inscrits:any = [];
propositions:any =[];
coursCommuns:any =  [];
paiements:any =  [];
  ngOnInit() {
    this.onFetchDernieresInscriptions();
    this.onFetchDernieresPropositions();
    this.onFetchDerniersCoursCommuns();
    this.onFetchStatistiquesInscrits();
    this.onFetchPaiements();
  }
  onFetchStatistiquesInscrits(){
    this.inscriptionService.statistiquesInscritsParJour().subscribe(
      (resp)=>{
        console.log(resp);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  onFetchPaiements(){
    this.paiementService.getPaiementsActifDashboard().subscribe(
      (response)=>{
        //console.log("Paiements Actif....");
        this.paiements = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  onFetchDernieresInscriptions(){
    this.inscriptionService.getDashBoardInscrits().subscribe(
      (response)=>{
        //console.log("Inscrits DashBoard.....");
        //console.log(response);
        this.inscrits = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  onFetchDerniersCoursCommuns(){
    this.coursCommunService.getDashBoardCoursCommuns().subscribe(
      (response)=>{
       // console.log("Derniere cours communs DashBoard.....");
       // console.log(response);
        this.coursCommuns = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  onFetchDernieresPropositions(){
    this.propositionService.getDashBoardPropositions().subscribe(
      (response)=>{
        //console.log("Dernieres Propositions de formations DashBoard.....");
        //console.log(response);
        this.propositions = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
