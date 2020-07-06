import { FavorisService } from './../../formations/services/favoris.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoris-proposition',
  templateUrl: './favoris-proposition.component.html',
  styleUrls: ['./favoris-proposition.component.css']
})
export class FavorisPropositionComponent implements OnInit {


  propositionFormations = [] ;
  constructor(private favorisService : FavorisService) { }

  ngOnInit() {

    this.onFetchFavoris() ;
  }

  onFetchFavoris(){
    this.favorisService.recupererFavoris().subscribe(

      (resp)=>{
        this.propositionFormations = resp ;
        //console.log(resp);
        
      },
      (error)=>{

        console.log(error);
        
      }

    )
  }

}
