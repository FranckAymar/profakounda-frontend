import { URL } from 'src/app/API_url/config';
import { Component, OnInit, Input } from '@angular/core';
import { CoursCommunAdminService } from '../services/cours-commun-admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-cours-commun-admin',
  templateUrl: './details-cours-commun-admin.component.html',
  styleUrls: ['./details-cours-commun-admin.component.css']
})
export class DetailsCoursCommunAdminComponent implements OnInit {


  urlServer = URL.getLogoCoursCommun;


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
      },


      (error)=>{

        console.log(error);
        
      },

    )
}


}
