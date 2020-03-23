import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { ForfaitService } from './services/forfait.service';
import { FiliereService } from './services/filiere.service';
import { ClasseService } from './services/classe.service';
import { CycleService } from './services/cycle.service';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NiveauComponent } from './niveau/niveau.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FiliereComponent } from './filiere/filiere.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ContentAdminComponent } from './content-admin/content-admin.component';
import { ClasseComponent } from './classe/classe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CycleComponent } from './cycle/cycle.component';
import { ForfaitComponent } from './forfait/forfait.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminMainComponent } from './admin-main/admin-main.component';



const adminRouter : Routes = [
  {path: 'admin', component  : AdminMainComponent,
    children : [
      {
        path : '',
        component : DashboardHomeComponent
        
      },
      {
        path : 'classe',
        component : ClasseComponent
        
      },
      {
        path : 'classe',
        component : ClasseComponent
        
      },
      {
        path : 'filiere',
        component : FiliereComponent
        
      },
      {
        path : 'cycle',
        component : CycleComponent
        
      },
      {
        path : 'forfait',
        component : ForfaitComponent
        
      },
      {
        path : 'niveau',
        component : NiveauComponent
        
      },


    ]},
] ;



@NgModule({
  declarations: [ClasseComponent,
                ContentAdminComponent,
                CycleComponent,
                DashboardHomeComponent,
                FiliereComponent,
                FooterComponent,
                ForfaitComponent,
                NavbarComponent,
                NiveauComponent,
                SidebarComponent,
                AdminMainComponent  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(adminRouter),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule


  ], 
  providers : [
    ClasseService,
    CycleService,
    FiliereService,
    ForfaitService,
    NiveauService
  ]
})
export class AdminModule { }
