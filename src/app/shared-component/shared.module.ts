import { MaterialDesignModule } from './../material-design/material-design.module';
import { CardCoursCommunComponent } from './../cours-commun/card-cours-commun/card-cours-commun.component';
import { CardFormationComponent } from './../formations/card-formation/card-formation.component';
import { PaymentCoursCommunComponent } from './payment-cours-commun/payment-cours-commun.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavbarAuthComponent } from './navbar-auth/navbar-auth.component';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { GooglePlaceComponent } from './google-place/google-place.component';
import { OganiserCoursSheetComponent } from './oganiser-cours-sheet/oganiser-cours-sheet.component';
import { DetailsInscritsComponent } from './details-inscrits/details-inscrits.component';
import { SearchBarCoursCommunComponent } from './search-bar-cours-commun/search-bar-cours-commun.component';
import { AlertComponent } from './alert/alert.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
registerLocaleData(localeFr);

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
    CKEditorModule  ,
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
    CKEditorModule,
    AgmCoreModule,
    NavbarAuthComponent,
    NavbarHomeComponent,
    SearchBarComponent,
    CardCoursCommunComponent,
    SearchBarCoursCommunComponent
  ],

  providers : [DatePipe,
               {
                 provide: LOCALE_ID,
                 useValue: 'fr-FR'
               }],
  entryComponents : [OganiserCoursSheetComponent,
                    PaymentCoursCommunComponent,
                    DetailsInscritsComponent,
                    AlertComponent]
})
export class SharedModule { }
