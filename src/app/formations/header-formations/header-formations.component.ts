import { SignInService } from './../../home/services/sign-in.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-formations',
  templateUrl: './header-formations.component.html',
  styleUrls: ['./header-formations.component.css']
})
export class HeaderFormationsComponent implements OnInit {

 
  authenticated : boolean;


  constructor(private signInService : SignInService) { }


  ngOnInit() {
    //Vérifie si l'utilisateur est connecté
    this.authenticated = this.signInService.isLogged() ;
  }


}
