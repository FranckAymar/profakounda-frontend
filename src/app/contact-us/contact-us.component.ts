import { SnackbarService } from './../shared-component/services/snackbar.service';
import { ContactServiceService } from './../shared-component/services/contact-service.service';
import { SignInService } from './../home/services/sign-in.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  API_KEY = "AIzaSyCud6-IOzGf04McqnGvz3z-pCdDEhci9Jw";
  contactUsForm : FormGroup ;
  email : string ;
  constructor(private formBuilder : FormBuilder,
              private signInService : SignInService,
              private contactService : ContactServiceService,
              private snackBarService : SnackbarService) { }

  ngOnInit() {
    this.initForm();

    this.email = localStorage.getItem(this.signInService.USERNAME);

    if(this.email){
      this.contactUsForm.get('email').setValue(this.email);
    }
  }

  initForm(){

    this.contactUsForm = this.formBuilder.group(
      {
        nom : ['', Validators.required],
        telephone : [''],
        email : ['', Validators.email],
        message : ['', Validators.required]
      }
    )
  }


  sendMessage(){

    this.contactService.sendMessage(this.contactUsForm.value).subscribe(

      (resp)=>{

        if(resp.code === 0){

          this.snackBarService.openSnackBar("Message bien envoyé ! Merci");
          this.initForm();
        }
        
        
      },

      (error)=>{
        
        console.log(error);
        
      }
    )

  }

}
