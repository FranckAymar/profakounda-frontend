import { URL } from 'src/app/API_url/config';
import { ContentCustomersComponent } from './../../customers/content-customers/content-customers.component';
import { ListFormationsService } from './../services/list-formations.service';
import { Component, OnInit } from '@angular/core';
import{Pipe , PipeTransform} from '@angular/core';
import{ FilterArrayPipe} from './filter.pipe';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.css'],
  providers: [FilterArrayPipe],
})

export class ListFormationsComponent implements OnInit {
  
  valeur="";
  ladate = new Date();
  propositionFormations = [];
  modulesFormation = [];
  FormationFiltres=[];
  urlServer = URL.getPhoto;

  constructor(private filterArrayPipe: FilterArrayPipe ,private listFormationsService : ListFormationsService) { }

  
  ngOnInit() {
  this.onGetListFormation();
  this.OnFiltreFormation(this.valeur);
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
  
  OnFiltreFormation(filtre:String){
    this.listFormationsService.getFilterFormation(filtre).subscribe(
        
      (reponse)=>{
        this.propositionFormations=reponse;
      },

      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }

}
