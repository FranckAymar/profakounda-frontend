import { SharedModule } from './../shared.module';
import { signUpvalidationService } from './services/signUp-validation.service';
import { SignUpvalidationComponent } from './sign-upvalidation/sign-upvalidation.component';
import { ResetPasswordService } from './services/reset-password.service';
import { SignInGuard } from '../guard/sign-in.guard';
import { SignInService } from './services/sign-in.service';
import { RouterModule,  } from '@angular/router';
import { HomeComponent } from './home-main/home.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AnoncesFormationComponent } from './anonces-formation/anonces-formation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AvisService } from './services/avis.service';
import { AnnoncesCourscommunComponent } from './annonces-courscommun/annonces-courscommun.component';
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
             
      },

   ]
  } 
]



@NgModule({
  declarations: [SignInComponent, 
    SignUpComponent, 
    HomeComponent, 
    AnoncesFormationComponent, 
    ForgotPasswordComponent, 
    SliderHomeComponent, 
    ResetPasswordComponent,
    SignUpvalidationComponent,
    AnnoncesCourscommunComponent,
   
   ],
  imports: [
    RouterModule.forChild(homeRouter),
    SharedModule
  ],
  providers : [
    SignInService, ResetPasswordService, signUpvalidationService,AvisService

  ]
})
export class HomeModule { }
