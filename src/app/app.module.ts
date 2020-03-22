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
import { NiveauComponent } from './admin/niveau/niveau.component';
import { NiveauService } from './services/niveau.service';


const appRouter : Routes = [
  {path: 'admin/dashboard-home', component  : DashboardHomeComponent},
  {path: 'admin/classe', component  : ClasseComponent},
  {path: 'admin/cycle', component  : CycleComponent},
  {path: 'admin/niveau', component  : NiveauComponent},
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
     FiliereComponent,
     NiveauComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRouter), HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    NiveauService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 