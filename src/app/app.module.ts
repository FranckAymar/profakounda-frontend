import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentAdminComponent } from './content-admin/content-admin.component';
import { RouterModule, Routes} from '@angular/router'
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ClasseComponent } from './admin/classe/classe.component';
import { CycleComponent } from './admin/cycle/cycle.component';
import { FiliereComponent } from './admin/filiere/filiere.component';
import { HttpClientModule } from '@angular/common/http';
import { ForfaitComponent } from './admin/forfait/forfait.component';


const appRouter : Routes = [
  {path: 'admin/dashboard-home', component  : DashboardHomeComponent},
  {path: 'admin/classe', component  : ClasseComponent},
  {path: 'admin/cycle', component  : CycleComponent},
  {path: 'admin/filiere', component  : FiliereComponent}, 
  {path: 'admin/forfait', component  : ForfaitComponent}, 

  

  
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
     FiliereComponent,
     ForfaitComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRouter), HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
