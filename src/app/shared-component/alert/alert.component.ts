import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AlertComponent implements OnInit {
  
  
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceived: any) {}

  onNoClick(response?): void {

    if(this.dataReceived.type === 'publicCible' && response){
     
      this.dialogRef.close({type : this.dataReceived.type, response : response});

    }else if(this.dataReceived.type === 'coursGeneral' && response){
      this.dialogRef.close({type : this.dataReceived.type, response : response});

    }else{
      this.dialogRef.close();
    }
  }

  

  ngOnInit() {
  }



}
