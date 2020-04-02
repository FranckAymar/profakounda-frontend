import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  lat: number = 5.338390;
  lng: number = -4.097748;
 
  constructor() { }

  ngOnInit() {
  }

}
