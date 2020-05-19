import { CoursCommunAdminService } from './../services/cours-commun-admin.service';
import { Component, OnInit } from '@angular/core';
import { CauserefusService } from '../services/causerefus.service';

@Component({
  selector: 'app-admin-common-course',
  templateUrl: './admin-common-course.component.html',
  styleUrls: ['./admin-common-course.component.css']
})
export class AdminCommonCourseComponent implements OnInit {

  constructor(private coursCommunAdminService : CoursCommunAdminService, private refusService:CauserefusService) { }

  courCommuns= [];

  idPropositionCourante : number ;
  causeRefusId : number;
  causeRefusTab = [];
  critereFiltre : number ;

  ngOnInit() {

    this.onFetchAllcoursCommunAdmin();
    this.onFetchCauseRefus();
  }

  onFetchCoursCommuns(){

    
    this.coursCommunAdminService.fetchCoursCommun().subscribe(

      (resp) => {
       
      },

      (error) => {
        console.log(error);
        

      }

    )
  }


  onFetchAllcoursCommunAdmin(critereFiltre? : number){
    
    this.coursCommunAdminService.fetchAllcoursCommunAdmin(critereFiltre).subscribe(


      (resp) => {
        this.courCommuns = resp ;
        
      },


      (error) => {
        console.log(error);
        

      }

    )
  }


  onAccorderMiseEnLigne(idProposition){
    this.coursCommunAdminService.mettreEnLigne(idProposition).subscribe(


      (resp)=>{
        
        alert("mise en ligne accordé") ;

        this.onFetchAllcoursCommunAdmin();

      },
      (error)=>{
          console.log(error);
          
      }
      

    )
  }

  prepareToRefusEnLigne(idProposition){
  
    this.idPropositionCourante = idProposition ;
  }

  onRefuserMiseEnLigne(){
   
    this.coursCommunAdminService.refuserMiseEnLigne(this.idPropositionCourante, this.causeRefusId).subscribe(


      (resp)=>{
        alert("Refus validé") ;
        document.getElementById('closeModalChoixRefus').click() ;
         this.onFetchAllcoursCommunAdmin();
      },
      (error)=>{

        console.log(error);
        
      }
      
    )
  }


  onFetchCauseRefus(){

    this.refusService.fetchRefus().subscribe(

      (resp)=>{

        this.causeRefusTab = resp ;
      },

      (error)=>{

        console.log(error);
        
      }
    )
  }


  supprimerMiseEnLigne(id){

    confirm('Etes vous sur de cette action ?') ;

    this.coursCommunAdminService.supprimerMiseEnLigne(id).subscribe(
    
      (response)=>{ 
        this.onFetchAllcoursCommunAdmin();
      },
      (error)=>{
        console.log("Error de suppression: "+error);
      }
    )

  }

}
