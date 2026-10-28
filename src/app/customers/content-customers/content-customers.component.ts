import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-content-customers',
    templateUrl: './content-customers.component.html',
    styleUrls: ['./content-customers.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContentCustomersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
