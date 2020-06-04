import { Particulier } from './../../home/models/Particulier.model';
import { URL } from './../../API_url/config';
import { SignInService } from './../../home/services/sign-in.service';
import { ParticulierService } from './../services/particulier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  id: number;
  urlServer = URL.getPhoto;
  particulier : Particulier

  constructor(private particulierService: ParticulierService,
    private signInService: SignInService) { }


  ngOnInit() {

    this.rechercherPaticulierConnecter() ;

  }

  rechercherPaticulierConnecter() {
    this.particulierService.rechercherParticulier(localStorage.getItem(this.signInService.USERNAME))
      .subscribe(
        (reponse) => {
          
          this.particulier = reponse;
        },
        (error) => {
          console.log("Une erreur s'est produite: " + error);
        }
      )
  }


}
