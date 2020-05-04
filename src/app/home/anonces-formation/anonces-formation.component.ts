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
  //Nombre de données à chargées à chaque page
  numberDataOfPage: number = 15;
  //Page courante
  page: number = 1;
  //Taille totale des données en base de données
  sizeData: number;
  //Nombre de page totals
  totalPage: number
  totalPageArray: Array<any>;

  constructor(private listFormationsService : ListFormationsService) { }

  ngOnInit() {

    this.onGetListFormation() ;
    
  }


  onGetListFormation() {


    this.listFormationsService.getListPropositionFormations().subscribe(

      
      (resp) =>{


        console.log(resp);
    
        this.propositionFormations = resp ;
        

      },

      
      (error) =>{

        console.log(error);
        

      }
    )

  }


}
