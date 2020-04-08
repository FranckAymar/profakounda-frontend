import { SignUpvalidationComponent } from './../sign-upvalidation/sign-upvalidation.component';
import { ResetPasswordService } from './services/reset-password.service';
import { SignInGuard } from '../guard/sign-in.guard';
import { SignInService } from './services/sign-in.service';
import { RouterModule,  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home-main/home.component';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
        component : SignInComponent , canActivate : [SignInGuard]
        
      },
      {
        path : 'sign-up', canActivate : [SignInGuard],
        component : SignUpComponent
        
      },
      {
        path : 'forgot-password',
        component : ForgotPasswordComponent
        
      },
      {
        path : 'reset-password/:token',
        component : ResetPasswordComponent
             
      }, 
      {
        path : 'sinUp-validation/:token',
        component : SignUpvalidationComponent
             
      }
   ]
  }
]



@NgModule({
  declarations: [SignInComponent, 
    SignUpComponent, 
    HomeComponent, 
    AnoncesFormationComponent, 
    FooterHomeComponent, 
    ForgotPasswordComponent, 
    SliderHomeComponent, 
    HeaderHomeComponent, 
    ResetPasswordComponent,
   
   ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRouter),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
     ],
  providers : [
    SignInService, ResetPasswordService
  ]
})
export class HomeModule { }
