import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-cours-commun-main',
    templateUrl: './cours-commun-main.component.html',
    styleUrls: ['./cours-commun-main.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CoursCommunMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
