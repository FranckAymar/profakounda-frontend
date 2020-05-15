import { OganiserCoursSheetComponent } from './../../shared-component/oganiser-cours-sheet/oganiser-cours-sheet.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cours-commun',
  templateUrl: './cours-commun.component.html',
  styleUrls: ['./cours-commun.component.css']
})
export class CoursCommunComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit() {
  }


  goToOrganiserCours(): void {

    //Fermetture par défaut de toutes les dialogues
    this.dialog.closeAll();
  
    const dialogRef = this.dialog.open(OganiserCoursSheetComponent, {
      hasBackdrop : true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: '800px',
      data: {},
      
      });
  
  
    /*
      Après fermetture de la dialogue
    */   
    dialogRef.afterClosed().subscribe(result => {
  
  
    });
  
  };

}
