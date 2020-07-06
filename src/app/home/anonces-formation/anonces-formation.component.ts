import { SignInService } from './../services/sign-in.service';
import { Router } from '@angular/router';
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
isNombreMaxAtteint:boolean = false;
  constructor(private listFormationsService : ListFormationsService,
      private router : Router,
      private signInService : SignInService) { }

  ngOnInit() {

    this.onGetListFormation() ;
    
  }


  onGetListFormation() {


    this.listFormationsService.getListPropositionFormationsForHome().subscribe(

      
      (resp) =>{
       
        this.propositionFormations = resp['formations'] ;
        this.isNombreMaxAtteint = resp['nombreMaxAtteint'];
      
      },

      
      (error) =>{

        console.log(error);
        

      }
    )

  }


  goToDashboard(){
    
    

    if(localStorage.getItem(this.signInService.TOKEN) !== null){
      console.log('ok');
      
      this.router.navigateByUrl('customers/formations') ;

    }else{
      this.router.navigateByUrl('home/sign-in') ;

    }
  }


}
