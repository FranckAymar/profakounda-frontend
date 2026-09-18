import {SignInService} from './home/services/sign-in.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor(private signInService: SignInService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(this.signInService.TOKEN) ;

    if(token) {
        const authReq = req.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        });

        return next.handle(authReq);
    }else {
        return next.handle(req);
    }
}
}
