import { AgmCoreModule } from '@agm/core';
import { PropostionFormationsAdminService } from './services/propostion-formations-admin.service';
import { CauserefusService } from './services/causerefus.service';
import { AdminGuard } from '../guard/admin.guard';
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
import { JourComponent } from './jour/jour.component';
import { JourService } from '../customers/services/Jour.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormationService } from './services/formation.service';
import { FormationComponent } from './formation/formation.component';
import { PaiementsComponent } from './paiements/paiements.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { AllConsultationsCustomersComponent } from './all-consultations-customers/all-consultations-customers.component';
import { VilleService } from './services/ville.service';
import { VilleComponent } from './ville/ville.component';
import { CauserefusComponent } from './causerefus/causerefus.component';
import { FormationMangementeService } from './services/formationMangemente.service';
import { PropostionFormationsAdminComponent } from './propostion-formations-admin/propostion-formations-admin.component';
import { DetailsPropostionFormationAdminComponent } from './details-propostion-formation-admin/details-propostion-formation-admin.component';



const adminRouter : Routes = [
  {path: 'admin', component  : AdminMainComponent , canActivate : [AdminGuard], data : { role : 'ROLE_ADMIN'},
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
      {
        path : 'jour',
        component : JourComponent
        
      },
      {
        path : 'ville',
        component : VilleComponent
        
      },
      {
        path : 'formation',
        component : FormationComponent
        
      },
      {
        path : 'paiements',
        component : PaiementsComponent
        
      }
      ,
      {
        path : 'particulierpropositions',
        component : AllConsultationsCustomersComponent
        
      }
      ,
      {
        path : 'customers',
        component : AllCustomersComponent
        
      }, 
      
      {
        path : 'causerefus',
        component : CauserefusComponent
        
      },

      {
        path : 'propositonsformations',
        component : PropostionFormationsAdminComponent
        
      },

      {
        path : 'propositonsformations/:id',
        component : DetailsPropostionFormationAdminComponent
        
      }  

    ]}

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
                VilleComponent,
                SidebarComponent,
                AdminMainComponent,
                JourComponent,
                FormationComponent,
                PaiementsComponent,
                AllCustomersComponent,
                AllConsultationsCustomersComponent,
                VilleComponent,
                CauserefusComponent,
                
                PropostionFormationsAdminComponent,
                DetailsPropostionFormationAdminComponent ],
  imports: [
    CommonModule, 
    RouterModule.forChild(adminRouter),
    HttpClientModule,
    FormsModule, 
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdrVoDFD_XTsAxUo2-VH0HTLX5IrdfC_E'
    }) ,


  ], 
  providers : [
    ClasseService,
    CycleService,
    FiliereService,
    ForfaitService,
    NiveauService,
    JourService,
    VilleService,
    FormationService, 
    CauserefusService,
    FormationMangementeService,
    PropostionFormationsAdminService
  ]
})
export class AdminModule { }
