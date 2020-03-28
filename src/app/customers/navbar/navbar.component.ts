import { SignInService } from '../../home/services/sign-in.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private signInService : SignInService , 
              private router : Router) { }

  ngOnInit() {
  }



  logout() {

    this.signInService.logout() ;
    this.router.navigateByUrl('/home/sign-in') ;
  }

}
