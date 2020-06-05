import { Component, OnInit } from '@angular/core';
import { InscriptioncourscommunService } from 'src/app/cours-commun/inscriptioncourscommun.service';
import { CoursCommunService } from '../services/cours-commun-service.service';
import { PropositionFormationService } from '../services/propositionFormation.service';

@Component({
  selector: 'app-dashboard-customers',
  templateUrl: './dashboard-customers.component.html',
  styleUrls: ['./dashboard-customers.component.css']
})
export class DashboardCustomersComponent implements OnInit {

  constructor(private inscriptionService:InscriptioncourscommunService,private coursCommunService:CoursCommunService,private propositionService:PropositionFormationService) { }
inscrits:any = [];
propositions:any =[];
coursCommuns:any =  [];
  ngOnInit() {
    this.onFetchDernieresInscriptions();
    this.onFetchDernieresPropositions();
    this.onFetchDerniersCoursCommuns();
  }
  onFetchDernieresInscriptions(){
    this.inscriptionService.getDashBoardInscrits().subscribe(
      (response)=>{
        console.log("Inscrits DashBoard.....");
        console.log(response);
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
        console.log("Derniere cours communs DashBoard.....");
        console.log(response);
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
        console.log("Dernieres Propositions de formations DashBoard.....");
        console.log(response);
        this.propositions = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
