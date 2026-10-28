import { MaterialDesignModule } from './../material-design/material-design.module';
import { CardCoursCommunComponent } from './../cours-commun/card-cours-commun/card-cours-commun.component';
import { CardFormationComponent } from './../formations/card-formation/card-formation.component';
import { PaymentCoursCommunComponent } from './payment-cours-commun/payment-cours-commun.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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

@NgModule({ declarations: [
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
    exports: [
        CardFormationComponent,
        FooterComponent,
        GooglePlaceComponent,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialDesignModule,
        CKEditorModule,
        GoogleMapsModule,
        NavbarAuthComponent,
        NavbarHomeComponent,
        SearchBarComponent,
        CardCoursCommunComponent,
        SearchBarCoursCommunComponent
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        GoogleMapsModule,
        MaterialDesignModule,
        CKEditorModule], providers: [DatePipe,
        {
            provide: LOCALE_ID,
            useValue: 'fr-FR'
        }, provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }
