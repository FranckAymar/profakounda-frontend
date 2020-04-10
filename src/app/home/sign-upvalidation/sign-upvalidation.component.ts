import { signUpvalidationService } from '../services/signUp-validation.service';
import { SignInComponent } from '../sign-in/sign-in.component';
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
  isValid : number ;

  constructor(private signUpvalidationService:signUpvalidationService,
              private Router: Router,
              private route: ActivatedRoute ) { 

                this.isValid =1 ;
              }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
                        
    this.route.params.subscribe(

      ( p ) =>{
         this.token = p['token'] ;
         this.validation(this.token) ;
      }
    ) ;

  }

  validation(token) {

    this.signUpvalidationService.requestToSignUpValidation(token).subscribe(
      (resp)=> {
        //Validation OK
        if(resp.code === 0) {
        
          this.isValid =0;
         
        }
        else if(resp.code===2){
          
          this.isValid =2; 
        }
        else{

          this.isValid = 1;

        }
        
      },
  
      (error)=> {
  
        this.isValid = 1 ;
        console.log(error);
        
      }
      
    )
  
  
  }
  

}
