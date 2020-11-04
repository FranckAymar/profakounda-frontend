import { SharedModule } from './shared-component/shared.module';
import { CoursCommunModule } from './cours-commun/cours-commun.module';
import { FormationsModule } from './formations/formations.module';
import { CustomersModule } from './customers/customers.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { SignInGuard } from './guard/sign-in.guard';
import { AdminGuard } from './guard/admin.guard';
import { XhrInterceptor } from './XhrInterceptor';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './LoadingInterceptor';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';



const appRouter : Routes = [
  { path: '',  redirectTo : '/home',
    pathMatch : 'full'
  },{
    path :'admin', redirectTo :'/admin'
  },
  {
    path :'customers', redirectTo :'/customers'
  } ,
  {
    path :'formations', redirectTo :'/formations'
  }
  ,
  {
    path :'courscommun', redirectTo :'/courscommun'
  }
  ,
  {
    path :'contactus', component : ContactUsComponent
  },{
    path: "**", redirectTo :'/error404'
  },
  
 
] ;


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ContactUsComponent,
    
  ],
  imports: [
    BrowserModule, 
    AdminModule,
    HomeModule,
    CustomersModule,
    FormationsModule,
    CoursCommunModule,
    ErrorPageModule,
    FormsModule,
    RouterModule.forRoot(appRouter, {scrollPositionRestoration: 'enabled'}),
    SharedModule
  
        
  
  ],

  exports : [],
  
  providers: [ 
   { 
    provide: HTTP_INTERCEPTORS, 
    useClass: XhrInterceptor, 
    multi: true 
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
   AdminGuard,
   SignInGuard,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 