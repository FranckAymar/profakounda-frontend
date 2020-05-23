import { PdfMakeWrapper, Toc, Txt, TocItem, Table, Cell } from 'pdfmake-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-details-inscrits',
  templateUrl: './details-inscrits.component.html',
  styleUrls: ['./details-inscrits.component.css']
})
export class DetailsInscritsComponent implements OnInit {


  headersTable = ['Nom', 'Prénoms', 'Date Inscription'];
  body = [] ;



  constructor(
    private dialogRef: MatDialogRef<DetailsInscritsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceived: any,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.body.push(this.headersTable);
    console.log(this.dataReceived);

  }


  createBodyOfTable(dataReceived) {

    let line;
    dataReceived.forEach(element => {

      line = [element.nom, element.prenoms, this.datePipe.transform(element.dateInscription,'dd-MMMM-yyyy')];
      this.body.push(line);
    });

  }


  generatePDFListInscrit(){


    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();

    this.createBodyOfTable(this.dataReceived.inscrit);

    if(!this.dataReceived.details.coursCommun){
      
      pdf.add(new Txt('Niveau : ' + this.dataReceived.details.niveau.libelle).end);
      pdf.add(new Txt('Filière : ' + this.dataReceived.details.filiere).end);

    }

    pdf.add(new Txt('Liste des inscrits').end);
    pdf.add(new Table(this.body).alignment('center').widths([ 150, 150, 150 ]).end) ;


    pdf.create().open();

  }

}