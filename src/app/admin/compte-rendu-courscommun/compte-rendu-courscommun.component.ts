import { Component, OnInit, Input } from '@angular/core';
import { CoursCommunAdminService } from '../services/cours-commun-admin.service';
import { OrganisationService } from '../services/organisation.service';

@Component({
  selector: 'app-compte-rendu-courscommun',
  templateUrl: './compte-rendu-courscommun.component.html',
  styleUrls: ['./compte-rendu-courscommun.component.css']
})
export class CompteRenduCourscommunComponent implements OnInit {

  constructor(private coursCommunAdminService : CoursCommunAdminService,private organisationService:OrganisationService) { }
  resultats= [];
  organisations = [];
  revenuGlobale = [];
  @Input() idOrganisation:Number;
  ngOnInit() {
    this.onFetchCoursCommuns();
    this.onFetchOrganisations();
  }
  rechercherpointParOrganisation(){
    console.log(this.idOrganisation);
    
    this.coursCommunAdminService.fetchCoursComptabiliteByOrganisation(this.idOrganisation).subscribe(

      (resp) => {
       console.log("Succes...")
      
      },

      (error) => {
        console.log(error);
        

      }

    )
  }
  onFetchOrganisations(){
    this.organisationService.fetchOrganisations().subscribe(
      (resp)=>{
        this.organisations = resp;
      },
      (error)=>{
        console.log("Erreur de recuperation des organisations");
      }
    )
  }

  
  onFetchCoursCommuns(){

    
    this.coursCommunAdminService.fetchCoursCommun().subscribe(

      (resp) => {
  console.log("execution..");
       this.resultats = resp['resultats'];
       this.revenuGlobale = resp['compteRenduGlobale'];
       
      },

      (error) => {
        console.log(error);
        

      }

    )
  }
  
}
