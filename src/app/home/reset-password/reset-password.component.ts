import { ResetPasswordService } from './../services/reset-password.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordMatch } from './../../custom-validator/password-match'
@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ResetPasswordComponent implements OnInit {


  resetPasswordForm : UntypedFormGroup ;
  token : string ;
  formVisible : boolean ;

  constructor(private formBuilder : UntypedFormBuilder,
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

  
  this.resetPassService.resetPassword(this.resetPasswordForm.value, this.token).subscribe(


    

    (resp)=> {
      
     // console.log(resp);
      
      if(resp.code === 0) {


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

