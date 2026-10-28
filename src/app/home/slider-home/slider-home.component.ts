import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-slider-home',
    templateUrl: './slider-home.component.html',
    styleUrls: ['./slider-home.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SliderHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
