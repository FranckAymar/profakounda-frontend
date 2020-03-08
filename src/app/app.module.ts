import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentAdminComponent } from './content-admin/content-admin.component';
import { RouterModule, Routes} from '@angular/router'
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ClasseComponent } from './admin/classe/classe.component';
import { CycleComponent } from './admin/cycle/cycle.component';
import { FiliereComponent } from './admin/filiere/filiere.component';


const appRouter : Routes = [
  {path: 'admin/dashboard-home', component  : DashboardHomeComponent},
  {path: 'admin/classe', component  : ClasseComponent},
  {path: 'admin/cycle', component  : CycleComponent},
  {path: 'admin/filiere', component  : FiliereComponent}

  
] ;


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentAdminComponent,
     DashboardHomeComponent,
     ClasseComponent,
     CycleComponent,
     FiliereComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRouter)
=======

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
>>>>>>> c444a65cfbcf54f440a8bdf2b9b6591ea4bd9aea
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
