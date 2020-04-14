import { AgmCoreModule } from '@agm/core';
import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { PropositionFormationService } from './services/propositionFormation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardCustomersComponent } from './dashboard-customers/dashboard-customers.component';
import { ContentCustomersComponent } from './content-customers/content-customers.component';

import { CustomerMainComponent } from './customer-main/customer-main.component';
import { CustomersGuard } from '../guard/customers.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PropositionFormationComponent } from './proposition-formation/proposition-formation.component';
import { PaiementsComponent } from './paiements/paiements.component';


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

      }

    ]
  }];



@NgModule({
  declarations: [NavbarComponent,
    SidebarComponent,
    DashboardCustomersComponent,
    ContentCustomersComponent,
    EditProfileComponent,
    
    CustomerMainComponent, PropositionFormationComponent, PaiementsComponent],

  providers: [

  ParticulierService,
  PropositionFormationService,

  ],

  imports: [
    CommonModule,
    RouterModule.forChild(customersRouter),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdrVoDFD_XTsAxUo2-VH0HTLX5IrdfC_E'
    }),
  ]
})
export class CustomersModule { }
