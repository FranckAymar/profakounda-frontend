import { SharedModule } from './../shared-component/shared.module';
import { PaiementService } from './services/paiement.service';
import { DetailsAnnonceComponent } from './details-annonce/details-annonce.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListFormationsComponent } from './list-formations/list-formations.component';
import { FormationsMainComponent } from './formations-main/formations-main.component';

const formationsRouter = [

  {
    path : 'formations', component : FormationsMainComponent ,
    children : [
      {
        path : '',
        component : ListFormationsComponent
        
      },
      {
        path : 'details-formation/:id',
        component : DetailsAnnonceComponent 
        
      },
      {
        path : ':value',
        component : ListFormationsComponent 
        
      }

    ]

  }
]


@NgModule({
  declarations: [ListFormationsComponent, 
                  FormationsMainComponent, 
                  DetailsAnnonceComponent,
     
     
    ],
  providers : [
    PaiementService

  ],
  imports: [
   
    RouterModule.forChild(formationsRouter),
    SharedModule

  ]
})
export class FormationsModule { }
