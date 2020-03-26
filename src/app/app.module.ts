import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router'
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { HomeComponent } from './home/home.component';
import { ParticulierService } from './home/services/particulier.service';




const appRouter : Routes = [
  { path: '',  redirectTo : '/home',
    pathMatch : 'full'
  },{
    path :'admin', redirectTo :'/admin'
  },
  {
    path :'customers', redirectTo :'/customers'
  }
 
] ;

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule, 
    AdminModule,
    HomeModule,
    RouterModule.forRoot(appRouter) 
    
  ],
  providers: [
   ParticulierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 