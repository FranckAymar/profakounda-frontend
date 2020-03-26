import { ErrorPageModule } from './error-page/error-page.module';
import { SignInGuard } from './sign-in.guard';
import { RoleGuard } from './role.guard';
import { XhrInterceptor } from './XhrInterceptor';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router'
import { ParticulierService } from './home/services/particulier.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const appRouter : Routes = [
  { path: '',  redirectTo : '/home',
    pathMatch : 'full'
  },{
    path :'admin', redirectTo :'/admin'
  },{
    path: "**", redirectTo :'/error404'
  }
 
] ;


@NgModule({
  declarations: [
    AppComponent,
   
    
  ],
  imports: [
    BrowserModule, 
    AdminModule,
    HomeModule,
    ErrorPageModule,
    RouterModule.forRoot(appRouter)
    
  ],
  providers: [
   ParticulierService, 
   { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
   RoleGuard,
   SignInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 