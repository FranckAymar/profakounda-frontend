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
              private coursCommunService : CoursCommunService) { }

  ngOnInit() {
    this.onFectCoursCommun();
  }


  goToOrganiserCours(): void {

    //Fermetture par défaut de toutes les dialogues
    this.dialog.closeAll();
  
    const dialogRef = this.dialog.open(OganiserCoursSheetComponent, {
      disableClose : true ,
      width: '800px',
      data: {},
      
      });
  
  
    /*
      Après fermetture de la dialogue
    */   
    dialogRef.afterClosed().subscribe(result => {
  
  
      this.onFectCoursCommun();
    });
  
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

}
