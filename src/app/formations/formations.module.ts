import { AgmCoreModule } from '@agm/core';
import { HomeModule } from './../home/home.module';
import { DetailsAnnonceComponent } from './details-annonce/details-annonce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFormationsComponent } from './list-formations/list-formations.component';
import { FormationsMainComponent } from './formations-main/formations-main.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderFormationsComponent } from './header-formations/header-formations.component';

const formationsRouter = [


  {
    path : 'formations', component : FormationsMainComponent ,
    children : [
      {
        path : '',
        component : ListFormationsComponent
        
      },
      {
        path : 'details-formation',
        component : DetailsAnnonceComponent 
        
      }



    ]

  }
]


@NgModule({
  declarations: [ListFormationsComponent, FormationsMainComponent, DetailsAnnonceComponent, HeaderFormationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(formationsRouter),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdrVoDFD_XTsAxUo2-VH0HTLX5IrdfC_E'
    }) 
    
  ]
})
export class FormationsModule { }
