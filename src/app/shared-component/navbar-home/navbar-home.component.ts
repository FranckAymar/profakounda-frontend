import { SignInService } from './../../home/services/sign-in.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {

  
  authenticated : boolean;
  profile : string ;

  constructor(private signInService : SignInService) { }



  ngOnInit() {
    //Vérifie si l'utilisateur est connecté
    this.authenticated = this.signInService.isLogged() ;
    this.profile = sessionStorage.getItem(this.signInService.AUHORITY);
    
    
    this.loadJavaScript();
  }

  public loadJavaScript() {
    let node = document.createElement("script");
    node.src = "assets/js/custom.js";
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
}


}
