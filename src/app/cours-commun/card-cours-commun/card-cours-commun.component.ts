import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-cours-commun',
  templateUrl: './card-cours-commun.component.html',
  styleUrls: ['./card-cours-commun.component.css']
})
export class CardCoursCommunComponent implements OnInit {

  @Input() cours;

  constructor() { }

  ngOnInit() {
  }

}
