import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { Page401Component } from './page401/page401.component';



const errorRouter = [


  {
    path : 'error404', component : Page404Component

  },
  {
    path : 'error401', component : Page401Component

  }
]

@NgModule({
  declarations: [Page404Component, Page401Component],
  imports: [
    CommonModule,
    RouterModule.forChild(errorRouter)
  ]
})
export class ErrorPageModule { }
