import { UserModel } from './../models/UserModel';
import { Router } from '@angular/router';
import { SignInService } from './../services/sign-in.service';
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


  credentials = {
    username: '',
    password: ''
  };

  user: UserModel = {};


  loginForm: FormGroup;

  isFailed: boolean;


  constructor(private signInService: SignInService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.isFailed = false;

  }



  ngOnInit() {
    this.initForm();
  }


  initForm() {

    this.loginForm = this.formBuilder.group({

      username: [null, Validators.required],
      password: [null, Validators.required]

    })

  }


  onLogin() {

    this.user.username = this.loginForm.value['username'];
    this.user.password = this.loginForm.value['password'];

    this.signInService.login(this.user).subscribe(


      (response) => {


        if (response.code == 0) {



          let authorities = 'ROLE_' + response.response[0].libelle;
          let token = btoa(this.user.username + ':' + this.user.password);
          let username = this.user.username;

          sessionStorage.setItem(this.AUHORITY, authorities);
          sessionStorage.setItem(this.TOKEN, token);
          sessionStorage.setItem(this.USERNAME, username);


          //Si l'utilisateur est un admin
          if (authorities === 'ROLE_ADMIN') {

            this.router.navigateByUrl('/admin');

            //Si c'est un particulier
          } else {

            alert('Réussi : Particulier pas encore disponible');
            this.signInService.logout();

            //Pas encore fonctionnel
            //this.router.navigateByUrl('/customers');

          }


          this.isFailed = false;

        } else {
          //Authentification échouée
          this.isFailed = true;
          console.log(response.response);
        }

      },

      (error) => {
        console.log(error);

      }


    )
  }

}
