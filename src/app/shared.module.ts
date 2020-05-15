import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CardFormationComponent } from './formations/card-formation/card-formation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule} from './material-design/material-design.module';
import { FooterComponent } from './shared-component/footer/footer.component';
import { SearchBarComponent } from './shared-component/search-bar/search-bar.component';
import { NavbarAuthComponent } from './shared-component/navbar-auth/navbar-auth.component';
import { NavbarHomeComponent } from './shared-component/navbar-home/navbar-home.component';
import { GooglePlaceComponent } from './shared-component/google-place/google-place.component';

@NgModule({
  declarations: [
    CardFormationComponent,
    NavbarHomeComponent,
    FooterComponent,
    NavbarAuthComponent,
    SearchBarComponent,
    GooglePlaceComponent

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
     SearchBarComponent
     
  
  ],
})
export class SharedModule { }
