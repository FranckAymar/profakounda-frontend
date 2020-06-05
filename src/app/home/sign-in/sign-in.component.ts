import { SnackbarService } from './../../shared-component/services/snackbar.service';
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
    private route : ActivatedRoute,
    private snackService : SnackbarService) {

    this.isFailed = false;
    this.errorInternet = false ;

  }



  ngOnInit() {
    this.initForm();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customers/editprofil';
    
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
    
    
   

    this.signInService.login(token).subscribe(

 
      (response) => {


          let authorities = response.authorities ;    
          let authority = authorities[0].authority;

          //Sauvegarde du token
          localStorage.setItem(this.TOKEN, token);
            //Sauvegarde de l'authorité
          localStorage.setItem(this.AUHORITY, authority);
            //Sauvegarde du username
          localStorage.setItem(this.USERNAME, username);
     
          //Si l'utilisateur est un admin
          if (authority === 'ROLE_ADMIN') {

            this.router.navigateByUrl('/admin');
            
          } else {
            this.router.navigateByUrl(this.returnUrl);
            
          }

      },

      (error) => {
        
        if(error.status === 401) {
          console.log(error);
          
          this.errorInternet = false ;
          this.isFailed = true ;
          //this.snackService.openSnackBar('Vérifier vos informations de connexion. Votre compte est-il actif ?');


        }else{
          this.errorInternet = true ;
          this.isFailed = false ;
         // this.snackService.openSnackBar('Vérifier votre connexion à internet ');

        }


      }

   );
     
  

  }

}
