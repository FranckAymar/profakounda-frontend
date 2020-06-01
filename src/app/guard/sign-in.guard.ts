import { SignInService } from '../home/services/sign-in.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {


  constructor(private signInService : SignInService,
    private router: Router) { };



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
      let token = sessionStorage.getItem(this.signInService.TOKEN)

      if (token) {
  
        this.router.navigateByUrl('/home');
  
        return false;
  
      } else {
       
        return true;
      }

  }


 
  
    
  }
   
   
    
  
  

