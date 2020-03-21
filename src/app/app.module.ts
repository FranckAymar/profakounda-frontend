import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD

=======
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
>>>>>>> 3d7554355a199bae4e9c499ee7c51704f2071fca
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
<<<<<<< HEAD
    BrowserModule, RouterModule.forRoot(appRouter), HttpClientModule
=======
    BrowserModule, RouterModule.forRoot(appRouter), HttpClientModule,
    FormsModule, ReactiveFormsModule
>>>>>>> 3d7554355a199bae4e9c499ee7c51704f2071fca
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
