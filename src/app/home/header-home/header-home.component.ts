import { SignInService } from '../services/sign-in.service';
import { Component, OnInit } from '@angular/core';
import { ListFormationsService } from 'src/app/formations/services/list-formations.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

 

  expression="";
  propositionFormations = [] ;
  authenticated : boolean;


  constructor(private signInService : SignInService,private listFormationsService : ListFormationsService) { }


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
