import { ResetPasswordService } from './../services/reset-password.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordMatch } from './../../custom-validator/password-match'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  resetPasswordForm : FormGroup ;
  token : string ;
  formVisible : boolean ;

  constructor(private formBuilder : FormBuilder,
              private resetPassService : ResetPasswordService, 
              private route : ActivatedRoute,
              private router : Router)
               {


                this.formVisible = false ;

               }

  ngOnInit() {

    this.initForm() ;
    this.getToken();
  } 

  initForm() {

    this.resetPasswordForm = this.formBuilder.group({
      password : [null , Validators.required],
      confirmPassword : [null, Validators.required],
    },
      {
        validator : PasswordMatch('password' , 'confirmPassword')
      }

    );

  }


  getToken() {

    this.route.params.subscribe(

      ( p ) =>{
         this.token = p['token'] ;
         this.verifyToken(this.token) ;
        
      } 
    ) ;

  }


verifyToken(token) {

  this.resetPassService.requestToVerifyResetPassword(token).subscribe(
    (resp)=> {

      
      if(resp.code === 0) {

        this.formVisible = true ;
      

      }
      
    },

    (error)=> {

      console.log(error);
      
    }
    
  )


}

onResetPassword() {

  console.log('test');
  
  this.resetPassService.resetPassword(this.resetPasswordForm.value, this.token).subscribe(


    

    (resp)=> {
      
      console.log(resp);
      
      if(resp.code === 0) {

        console.log('test');

        alert("Renitialisation effectuée avec succès") ;
        this.router.navigateByUrl('/home/sign-in');
      }else {

      }
      
    },

    (error)=> {
      console.log(error);
      
    }
  )

}

}

