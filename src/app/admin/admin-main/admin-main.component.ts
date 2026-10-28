import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
