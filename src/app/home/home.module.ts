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
import { MapsComponent } from './maps/maps.component';
import {AgmCoreModule} from '@agm/core'

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
        path : 'maps',
        component : MapsComponent
        
        
      }



    ]

  }

]



@NgModule({
  declarations: [SignInComponent, SignUpComponent, HomeComponent, AnoncesFormationComponent, FooterHomeComponent, ForgotPasswordComponent, SliderHomeComponent, HeaderHomeComponent, ResetPasswordComponent, MapsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRouter),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdrVoDFD_XTsAxUo2-VH0HTLX5IrdfC_E'
    })  ],
  providers : [
    SignInService, ResetPasswordService
  ]
})
export class HomeModule { }
