import { Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { SignInService } from './../../home/services/sign-in.service';
import { URL } from '../../API_url/config';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrls: ['./card-formation.component.css']
})
export class CardFormationComponent implements OnInit {

  urlServer = URL.getPhoto ;

  //Model
  favorisModel = {

    idProposition : null,
    idParticulier : null ,

  }

  @Input() code : string ;
  @Input() idParticulier : number ;
  @Input() moduleFormations : [] ;
  @Input() description : string ;
  @Input() ville : string ;
  @Input() id : number ;
  @Input() rayonIntervention : {} ;
  @Input() isFavoris ;


  //Sauvegarder l'URL courante 
   snapshot : RouterStateSnapshot ;
   state: RouterState 

  @Output() coordMapEvent = new EventEmitter<any>();
  constructor(private favorisService : FavorisService,
               private signInService : SignInService,
               private router : Router, 
               ) {

                this.state = router.routerState;
                this.snapshot = this.state.snapshot;

                }
  

 
  ngOnInit() {
  }

  onSendCoordMap(coord){
    this.coordMapEvent.emit(coord) ;
    
  }

  switchStateFavoris(isFavoris, id){

    

    if(!this.signInService.isLogged()){
      this.router.navigate(['/home/sign-in'], { queryParams: { returnUrl: this.snapshot.url }});
      return ;
    }

    this.favorisModel.idProposition = id ;

    
    if(!isFavoris){
      this.onAddFavoris(this.favorisModel)
    }else{
      this.onDeleteFavoris(this.favorisModel)
    }

    this.isFavoris = !isFavoris ;
    this.getStyle();
    
  }

  getStyle(){
    if(this.isFavoris == true){
      return '#EC4067' ;
    }
    return '#C0C0C0' ;
}

  onAddFavoris(favorisModel) {


    this.favorisService.addFavoris(favorisModel).subscribe(

      (resp)=>{
          console.log("Ajouter avec succès");
          
      },

      (error) => {
          console.log(error);
          
      }

    )

  }

  onDeleteFavoris(favorisModel){
    
    this.favorisService.supprimerFavoris(favorisModel).subscribe(

      (resp)=>{
          console.log("supprimer avec succès");
          
      },

      (error) => {
          console.log(error);
          
      }

    )

  }

}
