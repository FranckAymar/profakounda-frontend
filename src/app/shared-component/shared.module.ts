import { MaterialDesignModule } from './../material-design/material-design.module';
import { CardCoursCommunComponent } from './../cours-commun/card-cours-commun/card-cours-commun.component';
import { CardFormationComponent } from './../formations/card-formation/card-formation.component';
import { PaymentCoursCommunComponent } from './payment-cours-commun/payment-cours-commun.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavbarAuthComponent } from './navbar-auth/navbar-auth.component';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { GooglePlaceComponent } from './google-place/google-place.component';
import { OganiserCoursSheetComponent } from './oganiser-cours-sheet/oganiser-cours-sheet.component';
import { DetailsInscritsComponent } from './details-inscrits/details-inscrits.component';
import { SearchBarCoursCommunComponent } from './search-bar-cours-commun/search-bar-cours-commun.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    CardFormationComponent,
    NavbarHomeComponent,
    FooterComponent,
    NavbarAuthComponent,
    SearchBarComponent,
    GooglePlaceComponent,
    OganiserCoursSheetComponent,
    CardCoursCommunComponent,
    PaymentCoursCommunComponent,
    DetailsInscritsComponent,
    SearchBarCoursCommunComponent,
    AlertComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCud6-IOzGf04McqnGvz3z-pCdDEhci9Jw'
    }) ,
    MaterialDesignModule,
  ],
  exports : [
    CardFormationComponent,
    FooterComponent,
    GooglePlaceComponent,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialDesignModule,
     AgmCoreModule ,
     NavbarAuthComponent,
     NavbarHomeComponent,
     SearchBarComponent,
     CardCoursCommunComponent,
     SearchBarCoursCommunComponent
     
  
  ],
  entryComponents : [OganiserCoursSheetComponent, PaymentCoursCommunComponent, DetailsInscritsComponent, AlertComponent]
})
export class SharedModule { }
