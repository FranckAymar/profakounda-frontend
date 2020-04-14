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
})

export class ListFormationsComponent implements OnInit {
  
  private todos =[ 'tanfolo', 'sangare','franck','moussa'];
  valeur=' ';
  ladate = new Date();
  propositionFormations = [];
  modulesFormation = [];
  urlServer = URL.getPhoto

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
