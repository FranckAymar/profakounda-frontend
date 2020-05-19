import { Component, OnInit, Input } from '@angular/core';
import { CoursCommunAdminService } from '../services/cours-commun-admin.service';
import { ActivatedRoute } from '@angular/router';
import { PropostionFormationsAdminService } from '../services/propostion-formations-admin.service';

@Component({
  selector: 'app-cours-commun-admin',
  templateUrl: './cours-commun-admin.component.html',
  styleUrls: ['./cours-commun-admin.component.css']
})
export class CoursCommunAdminComponent implements OnInit {


  zoom = 14 ;

  @Input() detailsCoursCommun = {

    coursCommun : null,
    publicCible : null,
    lieuIntervention : null

  };

idCours : number;

  constructor(private coursCommunAdminService:CoursCommunAdminService,private route : ActivatedRoute,
               ) { }

  ngOnInit() {

    this.getIdCours() ;
    this.onDetailsCoursCommun(this.idCours) ;
   
  }

    //Recuperer l'id dans l'URL
    getIdCours() {
                            
      this.route.params.subscribe(
        ( p ) =>{
           this.idCours = p['id'] ;

        }
        
      
      ) ;
  
    }


  onDetailsCoursCommun(idCours){

    this.coursCommunAdminService.fetchCoursCommunParId(idCours).subscribe(

      (resp)=>{
        this.detailsCoursCommun = resp ;
        alert("ok"+this.detailsCoursCommun);
   
      },


      (error)=>{

        console.log(error);
        
      },

    )
}

}
