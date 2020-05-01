import { SignInService } from '../../home/services/sign-in.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { consts } from '../../API_url/const'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() id:number;
  @Input() url:string ;
  constructor(private signInService : SignInService , 
              private router : Router,private particulierService:ParticulierService) { }

  ngOnInit() {
    this.rechercherPaticulierConnecter();
  }

close(){
  document.getElementById('ed-mi-close').click();
}
  rechercherPaticulierConnecter(){
    this.particulierService.rechercherParticulier(sessionStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (reponse)=>{
       this.id = reponse['id'];
       this.url = consts.host+ consts.nameProject+"photoParticulier/"+this.id;
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

}
