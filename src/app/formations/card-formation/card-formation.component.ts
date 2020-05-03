import { URL } from './../../API_url/config';
import { Ville } from './../../admin/model/ville.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrls: ['./card-formation.component.css']
})
export class CardFormationComponent implements OnInit, OnChanges {

  urlServer = URL.getPhoto ;


  @Input() code : string ;
  @Input() idParticulier : number ;
  @Input() moduleFormations : [] ;
  @Input() description : string ;
  @Input() ville : string ;
  @Input() id : number ;
  @Input() rayonIntervention : {} ;
  @Input() isFavoris ;

  @Output() coordMapEvent = new EventEmitter<any>();
  constructor() { }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log( "onChangePreviuous : " +JSON.stringify(changes.isFavoris.previousValue));
  }
 
  ngOnInit() {
  }

  onSendCoordMap(coord){
    this.coordMapEvent.emit(coord) ;
    
  }

  switchStateFavoris(isFavoris){
    this.isFavoris = !isFavoris ;
    this.getStyle();
    
  }

  getStyle(){
    if(this.isFavoris == true){
      return '#EC4067' ;
    }
    return '#FFFFFF' ;
}

}
