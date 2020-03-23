import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AnoncesFormationComponent } from './anonces-formation/anonces-formation.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { HeaderHomeComponent } from './header-home/header-home.component';


const homeRouter = [


  {
    path : 'home', component : HomeComponent ,
    children : [
      {
        path : '',
        component : SliderHomeComponent
        
      },
      {
        path : 'sign-in',
        component : SignInComponent
        
      },
      {
        path : 'sign-up',
        component : SignUpComponent
        
      },
      {
        path : 'forgot-password',
        component : ForgotPasswordComponent
        
      }


    ]

  }

]



@NgModule({
  declarations: [SignInComponent, SignUpComponent, HomeComponent, AnoncesFormationComponent, FooterHomeComponent, ForgotPasswordComponent, SliderHomeComponent, HeaderHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRouter),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class HomeModule { }
