import { FiliereService } from './../../services/filiere.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {


  filieres  = [] ;

  constructor(private filiereService : FiliereService) { }

  ngOnInit() {

    this.onFetchFiliere() ;
  }

  onFetchFiliere() {

    this.filiereService.fetchFilieres().subscribe(

      (response)=> {
        this.filieres = response.response ;
        console.log(response.response)
      },

      (error)=> {

        console.log("Une erreur est survenue");
        
      }

    )

  }

}
