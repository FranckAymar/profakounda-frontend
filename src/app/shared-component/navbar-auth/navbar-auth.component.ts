import { Router } from '@angular/router';
import { ParticulierService } from './../../customers/services/particulier.service';
import { SignInService } from './../../home/services/sign-in.service';
import { Component, OnInit, Input } from '@angular/core';
import { consts } from '../../API_url/const'

@Component({
  selector: 'app-navbar-auth',
  templateUrl: './navbar-auth.component.html',
  styleUrls: ['./navbar-auth.component.css']
})
export class NavbarAuthComponent implements OnInit {
  isView ;
  isCollapsed= true ;

  @Input() id:number;
  @Input() url:string ;
  prenoms:string;
  nom:string;
  authorisation:any;
isExtension:boolean = false;
  constructor(private signInService : SignInService , 
              private router : Router,private particulierService:ParticulierService) {


  
  this.isView = false ;


               }

  ngOnInit() {
    
    this.rechercherPaticulierConnecter();
    this.loadJavaScript() ;
    this.verifier();
  }

  verifier(){
    this.signInService.verifier().subscribe(
      (response)=>{
        this.authorisation = response;
        
      },
      (error)=>{
        console.log(error);
      }
    )
  }
close(){
  document.getElementById('ed-mi-close').click();
}
  rechercherPaticulierConnecter(){
    this.particulierService.rechercherParticulier(localStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (reponse)=>{
        this.isExtension = reponse['extensionPresente'];
        console.log(this.isExtension);
       this.id = reponse['id'];
       this.url = consts.host+ consts.nameProject+"photoParticulier/"+this.id;
       this.nom = reponse["nom"];
       this.prenoms = reponse["prenoms"];
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }


  logout() {

    this.signInService.logout() ;
    this.router.navigateByUrl('/home/sign-in') ;
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
