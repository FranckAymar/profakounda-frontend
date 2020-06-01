import { SharedModule } from './../shared-component/shared.module';
import { PropostionFormationsAdminService } from './services/propostion-formations-admin.service';
import { CauserefusService } from './services/causerefus.service';
import { AdminGuard } from '../guard/admin.guard';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { ForfaitService } from './services/forfait.service';
import { FiliereService } from './services/filiere.service';
import { ClasseService } from './services/classe.service';
import { CycleService } from './services/cycle.service';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NiveauComponent } from './niveau/niveau.component';
import { FiliereComponent } from './filiere/filiere.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ContentAdminComponent } from './content-admin/content-admin.component';
import { ClasseComponent } from './classe/classe.component';
import { NgModule } from '@angular/core';
import { CycleComponent } from './cycle/cycle.component';
import { ForfaitComponent } from './forfait/forfait.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { JourComponent } from './jour/jour.component';
import { JourService } from '../customers/services/Jour.service';
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
import { AdminCommonCourseComponent } from './admin-common-course/admin-common-course.component';
import { DetailsCoursCommunAdminComponent } from './details-cours-commun-admin/details-cours-commun-admin.component';
import { CompteRenduCourscommunComponent } from './compte-rendu-courscommun/compte-rendu-courscommun.component';



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
        path : 'coursCommun/:id',
        component : DetailsCoursCommunAdminComponent
        
      },

      {
        path : 'propositonsformations/:id',
        component : DetailsPropostionFormationAdminComponent
        
      },

      {
        path : 'coursCommun',
        component : AdminCommonCourseComponent
        
      },
      {
        path : 'comptabilite',
        component : CompteRenduCourscommunComponent
        
      }

    ]}

] ;



@NgModule({
  declarations: [ClasseComponent,
                ContentAdminComponent,
                CycleComponent,
                DashboardHomeComponent,
                FiliereComponent,
                ForfaitComponent,
                NiveauComponent,
                VilleComponent,
                SidebarComponent,
                AdminMainComponent,
                JourComponent,
                CompteRenduCourscommunComponent,
                FormationComponent,
                PaiementsComponent,
                AllCustomersComponent,
                AllConsultationsCustomersComponent,
                VilleComponent,
                CauserefusComponent, 
                PropostionFormationsAdminComponent,
                DetailsPropostionFormationAdminComponent,
                AdminCommonCourseComponent,
                DetailsCoursCommunAdminComponent,
                CompteRenduCourscommunComponent],
  imports: [
    RouterModule.forChild(adminRouter),
    SharedModule
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
