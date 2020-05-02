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
