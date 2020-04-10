import { Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  //Clé des variables de session
  TOKEN = 'TOKEN';
  USERNAME = 'USERNAME';
  AUHORITY = 'AUTHORITY';


  loginForm: FormGroup;

  isFailed: boolean;
  errorInternet : boolean ;

  constructor(private signInService: SignInService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.isFailed = false;
    this.errorInternet = false ;

  }



  ngOnInit() {
    this.initForm();
  }


  initForm() {

    this.loginForm = this.formBuilder.group({

      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]

    })

  }


  onLogin() {

    let username = this.loginForm.value['username'];
    let password = this.loginForm.value['password'];
    
    let token = btoa(username + ':' + password);
    console.log(token);
    
    try {
      // synchronous operation

    this.signInService.login(token).subscribe(

 
      (response) => {


          let authorities = response.authorities ;    
          let authority = authorities[0].authority;

          //Sauvegarde du token
          sessionStorage.setItem(this.TOKEN, token);
            //Sauvegarde de l'authorité
          sessionStorage.setItem(this.AUHORITY, authority);
            //Sauvegarde du username
          sessionStorage.setItem(this.USERNAME, username);
     
          //Si l'utilisateur est un admin
          if (authority === 'ROLE_ADMIN') {

            this.router.navigateByUrl('/admin');
            
          } else {
           
           this.router.navigateByUrl('/customers');
          }

      },

      (error) => {
        
        if(error.status === 401) {

          this.errorInternet = false ;
          this.isFailed = true ;

        }else{
          this.errorInternet = true ;
          this.isFailed = false ;
        }


      }

   );
     
   }
   catch(error) {
      console.log('error', error);
      
   }

  }

}
