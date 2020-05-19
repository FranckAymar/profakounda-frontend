import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared-component/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsCoursCommunComponent } from './details-cours-commun/details-cours-commun.component';
import { CoursCommunMainComponent } from './cours-commun-main/cours-commun-main.component';
import { ListCoursCommunComponent } from './list-cours-commun/list-cours-commun.component';
import { CardCoursCommunComponent } from './card-cours-commun/card-cours-commun.component';


const coursCommunRouter = [

  {
    path : 'courscommun', component : CoursCommunMainComponent ,
    children : [
      {
        path : '',
        component : ListCoursCommunComponent
        
      },
      {
        path : 'details/:id', 
        component : DetailsCoursCommunComponent 
        
      } 

    ]

  }
]

@NgModule({
  declarations: [DetailsCoursCommunComponent, CoursCommunMainComponent, ListCoursCommunComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(coursCommunRouter),

  ]
})
export class CoursCommunModule { }
