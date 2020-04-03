import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {


  lat: number = 5.338390;
  lng: number = -4.097748;
  radius : number = 1000

  constructor() { }

  ngOnInit() {
  }


  ajoutMarqueur(lat : number, lng : number) {
     
    this.lat = lat ;
    this.lng = lng ;
    
  }

  

  changeRaduis(radius) {

    this.radius = radius ;
    
  }

}
