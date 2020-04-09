import { ListFormationsService } from './../../formations/services/list-formations.service';
import { URL } from './../../API_url/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anonces-formation',
  templateUrl: './anonces-formation.component.html',
  styleUrls: ['./anonces-formation.component.css']
})
export class AnoncesFormationComponent implements OnInit {



  propositionFormations = [] ;
  urlServer = URL.getPhoto ;

  constructor(private listFormationsService : ListFormationsService) { }

  ngOnInit() {

    this.onGetListFormation() ;
    
  }


  onGetListFormation() {

    this.listFormationsService.getListPropositionFormations().subscribe(

      
      (resp) =>{

        this.propositionFormations = resp ;
        

      },

      
      (error) =>{

        console.log(error);
        

      }
    )

  }

}
