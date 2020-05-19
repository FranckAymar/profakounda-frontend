import { ActivatedRoute, Router } from '@angular/router';
import { CoursCommunService } from './../services/cours-commun-service.service';
import { OganiserCoursSheetComponent } from './../../shared-component/oganiser-cours-sheet/oganiser-cours-sheet.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cours-commun',
  templateUrl: './cours-commun.component.html',
  styleUrls: ['./cours-commun.component.css']
})
export class CoursCommunComponent implements OnInit {


  coursCommuns = [] ;

  constructor(private dialog : MatDialog,
              private coursCommunService : CoursCommunService,
              private route : ActivatedRoute,
              private router : Router,
          ) { }

  ngOnInit() {
    this.onFectCoursCommun();
    console.log(this.coursCommuns);
    
  }

  ngOnDestroy() {
   this.dialog.closeAll();
  }


  openDialog(data){

      //Fermetture par défaut de toutes les dialogues
      this.dialog.closeAll();
  
      const dialogRef = this.dialog.open(OganiserCoursSheetComponent, {
        disableClose : true ,
        width: '800px',
        data: data,
        
        });
    
    
      /*
        Après fermetture de la dialogue
      */   
      dialogRef.afterClosed().subscribe(result => {
    
    
        this.onFectCoursCommun();
      });

  }

  goToOrganiserCours(): void {

    this.openDialog({});
  
  };


  onFectCoursCommun(){

    this.coursCommunService.fetchCoursCommun().subscribe(

      (resp)=>{
        console.log(resp);
        this.coursCommuns = resp ;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

  loadCoursCommun(data){

    this.navigateToModifyCours(data.id);
    this.openDialog(data) ;
    

  }

  navigateToModifyCours(idCoursCommun){
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
      courscommunedit: idCoursCommun 
     },
     queryParamsHandling: 'merge',
   });
  }

  demanderMiseEnLigne(id){
    this.coursCommunService.demandeMiseEnLigne(id)
    .subscribe(
      (response)=>{
        this.onFectCoursCommun();
      },
      (error)=>{
        console.log("Erreur : "+error);
      }
    )

  }



}
