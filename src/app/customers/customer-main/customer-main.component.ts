import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-customer-main',
    templateUrl: './customer-main.component.html',
    styleUrls: ['./customer-main.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CustomerMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
