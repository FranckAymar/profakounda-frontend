import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-details-inscrits',
  templateUrl: './details-inscrits.component.html',
  styleUrls: ['./details-inscrits.component.css']
})
export class DetailsInscritsComponent implements OnInit {

  constructor(
                  private dialogRef: MatDialogRef<DetailsInscritsComponent>,
                   @Inject(MAT_DIALOG_DATA) public dataReceived: [],
  ) { }

  ngOnInit() {
  }

}
