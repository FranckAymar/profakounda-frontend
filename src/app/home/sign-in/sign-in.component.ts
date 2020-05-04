import { Router, ActivatedRoute } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  returnUrl : string ;

  //Clé des variables de session
  TOKEN = 'TOKEN';
  USERNAME = 'USERNAME';
  AUHORITY = 'AUTHORITY';


  loginForm: FormGroup;

  isFailed: boolean;
  errorInternet : boolean ;

  constructor(private signInService: SignInService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute) {

    this.isFailed = false;
    this.errorInternet = false ;

  }



  ngOnInit() {
    this.initForm();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customers/editprofil';
    console.log(this.returnUrl);
    
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
    console.log(sessionStorage.getItem(this.signInService.TOKEN));
    
    
   

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
            this.router.navigateByUrl(this.returnUrl);
            
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

}
