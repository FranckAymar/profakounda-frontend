import { ClasseService } from './../../services/classe.service';
import { Classe } from './../../model/classe';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  classes = [] ;

  constructor(private classeService : ClasseService) { }

  ngOnInit() {
    this.onFetchClasses();
  }


  //Recuperer les classes
  onFetchClasses() {

    this.classeService.fetchClasses().subscribe(

      (response) => {

        this.classes = response.response ;
        console.log(response.response) ;

      },

      (error) => {

        console.log("Une erreur est survenue") ;
      }
    )

  }
  

}
