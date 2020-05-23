import { PropostionFormationsAdminService } from './../../admin/services/propostion-formations-admin.service';
import { PdfMakeWrapper, Toc, Txt, TocItem, Table, Cell, Img, Stack, Columns } from 'pdfmake-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
@Component({
  selector: 'app-details-inscrits',
  templateUrl: './details-inscrits.component.html',
  styleUrls: ['./details-inscrits.component.css']
})
export class DetailsInscritsComponent implements OnInit {


  headersTable = ['Nom', 'Prénoms', 'Date Inscription'];
  body = [];



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

      line = [element.nom, element.prenoms, this.datePipe.transform(element.dateInscription, 'dd-MMMM-yyyy')];
      this.body.push(line);
    });

  }


  generatePDFListInscrit() {

    PdfMakeWrapper.setFonts(pdfFonts);
   
  
    const pdf = new PdfMakeWrapper();

  

  //  pdf.add(new Img('../../../assets/images/icon/awa/Stylo_Noir_SF.png').build());

   


    new Img('../../../assets/images/logo.png').width(150).margin(40).build().then( img => {
    pdf.add( img);
    

    this.createBodyOfTable(this.dataReceived.inscrit);

    if (!this.dataReceived.details.coursCommun) {
      pdf.add(new Txt('Noveau : ' + this.dataReceived.details.niveau.libelle).end);
      pdf.add(new Txt('Filière : ' + this.dataReceived.details.filiere).end);
     // pdf.add(new Txt('Formations : ' + this.dataReceived.details.filiere).end);

    }else{
      pdf.add(new Txt('Organisation : ' + this.dataReceived.details.organisation.libelle).bold().end);
      pdf.add(new Txt('Titre : ' + this.dataReceived.details.titre).end);
  
    }

    pdf.add(new Txt('Liste des inscrits').alignment('center').decoration('underline').margin(20).bold().end);
    pdf.add(new Table(this.body).alignment('center').widths([150, 150, 150]).end);  

    pdf.footer('Imprimé le : ' + new Date())

    pdf.create().open();

      });

   
  }




}