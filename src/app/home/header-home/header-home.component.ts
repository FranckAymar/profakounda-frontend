import { SignInService } from '../services/sign-in.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {


  authenticated : boolean;


  constructor(private signInService : SignInService) { }


  ngOnInit() {
    //Vérifie si l'utilisateur est connecté
    this.authenticated = this.signInService.isLogged() ;
  }

}
