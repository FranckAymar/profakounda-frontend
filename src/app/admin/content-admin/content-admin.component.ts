import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-content-admin',
    templateUrl: './content-admin.component.html',
    styleUrls: ['./content-admin.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContentAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
