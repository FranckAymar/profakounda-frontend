import { SignInService } from '../services/sign-in.service';
import { Component, OnInit } from '@angular/core';
import { ListFormationsService } from 'src/app/formations/services/list-formations.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  valeur="";
  propositionFormations = [] ;
  authenticated : boolean;


  constructor(private signInService : SignInService,private listFormationsService : ListFormationsService) { }


  ngOnInit() {
    //Vérifie si l'utilisateur est connecté
    this.authenticated = this.signInService.isLogged() ;
  }

  OnFiltreFormation(filtre:String){  
   
    this.listFormationsService.getFilterFormation(filtre).subscribe(
    
      (reponse)=>{
        console.log(reponse);
        
        this.propositionFormations=reponse;
      },

      (erreur) => {
        console.log("Une erreur s'est produite: " + erreur);
      }
    )
  }
}
