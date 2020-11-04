import { LoadingService } from './services/loading.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, AfterViewInit {


  loading: boolean = false;
  //Observable
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingService) {
  }
  ngAfterViewInit(): void {

      //Modification de loading si une valeur est émise depuis le service LoadingService

    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
      (value) => {
      this.loading = value;
    });

  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
      (value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    //Destruction de l'observable
    this.loadingSubscription.unsubscribe();
  }

}
