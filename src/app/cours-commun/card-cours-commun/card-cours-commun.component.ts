import { URL } from 'src/app/API_url/config';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-cours-commun',
  templateUrl: './card-cours-commun.component.html',
  styleUrls: ['./card-cours-commun.component.css']
})
export class CardCoursCommunComponent implements OnInit {


  urlServer = URL.getLogoCoursCommun;


  @Input() cours;

  constructor() { }

  ngOnInit() {
  }

}
