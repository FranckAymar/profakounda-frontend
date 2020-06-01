import { LoadingService } from './loading/services/loading.service';
import { Injectable } from '@angular/core';
import { finalize } from "rxjs/operators";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingScreenService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Démarrage du loading
    this.loadingScreenService.startLoading();

    return next.handle(request).pipe(
      finalize(() => {
          //Fin du loading
          this.loadingScreenService.stopLoading();
      })
    )
  };

}