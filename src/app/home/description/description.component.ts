import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
