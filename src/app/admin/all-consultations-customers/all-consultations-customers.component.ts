import { URL } from 'src/app/API_url/config';
import { PropositionFormationService } from './../../customers/services/propositionFormation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-consultations-customers',
  templateUrl: './all-consultations-customers.component.html',
  styleUrls: ['./all-consultations-customers.component.css']
})
export class AllConsultationsCustomersComponent implements OnInit {

  urlServer = URL.getPhoto;

  propositionsParticuliers = [];

  constructor(private propositionFormationService : PropositionFormationService) { }

  ngOnInit() {
    this.onFetchAll() ;
  }


  onFetchAll(){
    this.propositionFormationService.rechercherAllProposition().subscribe(

      (resp)=> {
        this.propositionsParticuliers = resp ;
      },

      (error)=>{
        console.log(error);
        
      }
      
    )
  }

}
