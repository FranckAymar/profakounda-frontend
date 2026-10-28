import { ResetPasswordService } from './../services/reset-password.service';
import { PasswordResetModel } from './../models/password-reset';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ForgotPasswordComponent implements OnInit {


  forgotPasswordForm : UntypedFormGroup ;

  isFailed : boolean;
  constructor(private formBuilder : UntypedFormBuilder,
               private resetPasswordService : ResetPasswordService) {

                this.isFailed = false ;
                }

  ngOnInit( ) {

    this.initForm() ;
  }

  initForm () {

    this.forgotPasswordForm =  this.formBuilder.group({
      username : [null, [Validators.required, Validators.email]]
    });  

  }


  onRequestToResetPassword() {

    this.isFailed = false ;

    this.resetPasswordService.requestToResetPassword(this.forgotPasswordForm.value).subscribe(

      (response) => {

        if(response.code === 0) {

          this.initForm() ;
          alert('Mail de rénitialisation envoyé')

        }else {
          this.isFailed = true ;
        }
        
      },

      (error) => {

        console.log(error);
        

      }
      
    )
   

  }
  

}
