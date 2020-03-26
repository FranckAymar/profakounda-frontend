import { SignInService } from './home/services/sign-in.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private signInService: SignInService,
    private router: Router) { };

  authority: string;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      

    //Recupere la variable de la route courante
    const role = next.data.role;
    let authority = sessionStorage.getItem(this.signInService.AUHORITY) ;

    if (authority ===  role ) {
     
      return true;

    } else {
      this.router.navigateByUrl('/home/sign-in') ;
      return false;
    }

    
   return true ;
  }


}
