import { ListFormationsService } from './../../formations/services/list-formations.service';
import { URL } from './../../API_url/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anonces-formation',
  templateUrl: './anonces-formation.component.html',
  styleUrls: ['./anonces-formation.component.css']
})
export class AnoncesFormationComponent implements OnInit {

  valeur="";
  propositionFormations = [] ;
  urlServer = URL.getPhoto;

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

        this.propositionFormations = resp ;
        

      },

      
      (error) =>{

        console.log(error);
        

      }
    )

  }

  onGetListFormationPlus(pageActive) {

    this.page = pageActive;

    this.listFormationsService.getListPropositionFormations(this.page, this.numberDataOfPage).subscribe(


      (resp) => {

        this.sizeData = resp.totalData;

        this.totalPage = (this.sizeData / this.numberDataOfPage);

        if (this.sizeData % this.numberDataOfPage != 0) {
          this.totalPage = Math.ceil(this.totalPage);
        }
 
        this.totalPageArray = new Array(this.totalPage);

        console.log(resp.data);
        
        this.propositionFormations = resp.data;

      },


      (error) => {

        console.log(error);


      }
    )
 
  }
  


}
