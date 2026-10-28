import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-formations-main',
    templateUrl: './formations-main.component.html',
    styleUrls: ['./formations-main.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FormationsMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
