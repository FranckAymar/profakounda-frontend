import { signUpvalidationService } from './../home/services/signUp-validation.service';
import { SignInComponent } from './../home/sign-in/sign-in.component';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-sign-upvalidation',
  templateUrl: './sign-upvalidation.component.html',
  styleUrls: ['./sign-upvalidation.component.css']
})
export class SignUpvalidationComponent implements OnInit {

  token : string ;

  constructor(private signUpvalidationService:signUpvalidationService,
              private Router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
                        
    this.route.params.subscribe(

      ( p ) =>{
         this.token = p['token'] ;
         this.validation(this.token) ;

          this.Router.navigate(["/home/sign-in"]);
        
      }
    ) ;

  }

  validation(token) {

    this.signUpvalidationService.requestToSignUpValidation(token).subscribe(
      (resp)=> {
        if(resp.code === 0) {
        
          console.log(" appelle du service")
        }
        
      },
  
      (error)=> {
  
        console.log(error);
        
      }
      
    )
  
  
  }
  

}
