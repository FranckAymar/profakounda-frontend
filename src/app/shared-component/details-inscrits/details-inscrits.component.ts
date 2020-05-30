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


  headersTable = [  
                  new Txt('Nom').bold().end, 
                  new Txt('Prénoms').bold().end, 
                  new Txt("Date d'inscription").bold().end
                ];
  bodyOfTable = [];



  constructor(
    private dialogRef: MatDialogRef<DetailsInscritsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceived: any,
    private datePipe: DatePipe
  ) { }

  ngOnInit() { 

    this.bodyOfTable.push(this.headersTable);
    console.log(this.dataReceived);

  }


  createBodyOfTable(dataReceived) {

    let line;
    dataReceived.forEach(element => {

      line = [  
              element.nom, 
              element.prenoms, 
              this.datePipe.transform(element.dateInscription, 'dd-MMMM-yyyy')];

      this.bodyOfTable.push(line);
    });

  }


  generatePDFListInscrit() {

    PdfMakeWrapper.setFonts(pdfFonts);
   
    const pdf = new PdfMakeWrapper();
  //   pdf.info({
  //     title: 'Liste des inscrits',
  //     author: 'ProfAkounda'
  // });
  

    new Img('../../../assets/images/logo.png').width(150).margin([0,40,0,40]).build().then( img => {
    pdf.add( img);
    

    this.createBodyOfTable(this.dataReceived.inscrit);


    //Cas d'un cours avec public cible
    if (this.dataReceived.details.publicCible) {
      pdf.add(new Txt('Organisation : ' + this.dataReceived.details.cours.organisation.libelle).bold().end);
      pdf.add(new Txt('Titre : ' + this.dataReceived.details.cours.titre).margin([0,5,0,0]).end);
      pdf.add(new Txt('Niveau : ' + this.dataReceived.details.publicCible.niveau.libelle).margin([0,5,0,0]).end);
      pdf.add(new Txt('Filière : ' + this.dataReceived.details.publicCible.filiere).margin([0,5,0,0]).end);
      pdf.add(new Txt('Formations : ' + this.getFormationsForPublic(this.dataReceived.details.publicCible)).margin([0,5,0,0]).end);

     //Cas d'un cours général

    } else{
      pdf.add(new Txt('Organisation : ' + this.dataReceived.details.organisation.libelle).bold().end);
      pdf.add(new Txt('Titre : ' + this.dataReceived.details.titre).end);
  
    } 

    pdf.add(new Txt('Liste des inscrits').alignment('center').decoration('underline').margin(20).bold().end);
    pdf.add(new Table(this.bodyOfTable).alignment('center').widths([100, 250, 150]).end);  

    pdf.footer('Imprimé le : ' + new Date().toDateString())

    pdf.create().download('Liste_profAkounda_'+ this.dataReceived.details.cours.organisation.libelle + "_"+ new Date().getDate().toString()  );
    pdf.create().open();

      });

   
  }



  getFormationsForPublic(publicCible) : string{
    

    let formation = "";

    publicCible.formations.forEach(element => {
      
      let libelle = element.libelle ;

      if(formation ==""){
        formation = libelle;
      }else{
        formation = (formation + "/").concat(libelle)

      }

    });

    return formation ;
    

  }



}