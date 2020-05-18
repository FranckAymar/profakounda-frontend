import { ActivatedRoute, Router } from '@angular/router';
import { CoursCommunService } from '../../services/cours-commun-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-cours-commun',
  templateUrl: './details-cours-commun.component.html',
  styleUrls: ['./details-cours-commun.component.css']
})
export class DetailsCoursCommunComponent implements OnInit {


  zoom = 14 ;

  @Input() cours = {

    coursCommun : null,
    publicCible : null,
    lieuIntervention : null

  };

  idCoursCommun : number;

  constructor(private coursCommunService : CoursCommunService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.getIdCoursCommun() ;

    this.onFectCoursCommun();

  }

  onFectCoursCommun(){

    this.coursCommunService.fetchCoursCommun(this.idCoursCommun).subscribe(

      (resp)=>{
        this.cours = resp ;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

  
  //Recuperer l'id dans l'URL
  getIdCoursCommun() {

                            
    this.route.params.subscribe(

      ( p ) =>{
         this.idCoursCommun = p['id'] ;
      }
    ) ;

  }


}
