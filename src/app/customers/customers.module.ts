import { SharedModule } from './../shared.module';
import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { PropositionFormationService } from './services/propositionFormation.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardCustomersComponent } from './dashboard-customers/dashboard-customers.component';
import { ContentCustomersComponent } from './content-customers/content-customers.component';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomersGuard } from '../guard/customers.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PropositionFormationComponent } from './proposition-formation/proposition-formation.component';
import { PaiementsComponent } from './paiements/paiements.component';
import { FavorisPropositionComponent } from './favoris-proposition/favoris-proposition.component';
import { CompressorService } from './services/CompressorService';
const customersRouter: Routes = [

  {
    path: 'customers', component: CustomerMainComponent, canActivate: [CustomersGuard], data: { role: 'ROLE_PARTICULIER' },

    children: [
      {
        path: '',
        component: DashboardCustomersComponent

      },
      {
        path: 'editprofil',
        component: EditProfileComponent

      },
      {
        path: 'formations',
        component: PropositionFormationComponent

      },
      
      {
        path: 'paiements',
        component: PaiementsComponent

      },
      
      {
        path: 'favoris',
        component: FavorisPropositionComponent

      }

    ]
  }];



@NgModule({
  declarations: [
    SidebarComponent,
    DashboardCustomersComponent,
    ContentCustomersComponent,
    EditProfileComponent,
    
    CustomerMainComponent, 
    PropositionFormationComponent, 
    PaiementsComponent, FavorisPropositionComponent],

  providers: [

  ParticulierService,
  PropositionFormationService,
  CompressorService

  ],

  imports: [
    RouterModule.forChild(customersRouter),
    SharedModule
  ]
})
export class CustomersModule { }
