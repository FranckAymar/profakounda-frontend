import { PdfMakeWrapper, Img, Txt, QR, Columns } from 'pdfmake-wrapper';
import { CoursCommunService } from './../services/cours-commun-service.service';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { PaiementService } from './../../formations/services/paiement.service';
import { Component, OnInit } from '@angular/core';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {

  paiements = [] ;
  myCoursCommuns = [];

    //For pagination

  //Nombre de données à chargées à chaque page
  numberDataOfPage : number = 20 ;
  //Page courante
  page : number = 1;
  //Taille totale des données en base de données
  sizeData : number ;
  //Nombre de page totals
  totalPage : number 
  totalPageArray : Array<any> ;

  constructor(private paiementService : PaiementService,
            private signInService : SignInService,
            private coursCommunService : CoursCommunService,
            private datePipe: DatePipe) { }

  ngOnInit() {
    this.onFetchPayment(this.page) ;
    this.onFetchCoursCommun();
  }

  onFetchPayment(pageActive) {

    this.page = pageActive ;

    let username = sessionStorage.getItem(this.signInService.USERNAME);

    this.paiementService.getPaymentParticulier(username, this.page, this.numberDataOfPage).subscribe(


      (resp)=> {

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        
        this.totalPageArray = new Array(this.totalPage);
  
        this.paiements = resp.data ;
      },

      (error) => {
        console.log(error);
        
      }


    )
    

  }


  onFetchCoursCommun(){

    this.coursCommunService.fectchCoursCommunSelect().subscribe(

      (resp)=>{

        this.myCoursCommuns = resp;
        console.log(this.myCoursCommuns);

      },

      (error)=>{

        console.log(error);
        
      }
    )
  }

  onGenerateRecuPaiement(data){

    console.log(data);
    
    PdfMakeWrapper.setFonts(pdfFonts);
   
    const pdf = new PdfMakeWrapper();

    
    new Img('../../../assets/images/logo.png').width(150).margin([0,30,0,30]).build().then( img => {
    pdf.add(new Columns([img, new QR(data.codeInscription.toString()).fit(100).alignment('right').end]).end)

    pdf.add(new Txt('Recu de paiement').bold().decoration('underline').margin([0,20,0,20]).end)
    pdf.add(new Txt('Date : ' + this.datePipe.transform(data.dateInscription, 'dd-MMMM-yyyy')).margin([0,10,0,0]).end)
    
    pdf.add(new Txt('PROVENANT DE :').margin([0,10,0,0]).bold().end)
    pdf.add(new Txt('ProfAkounda').end)
    pdf.add(new Columns([new Txt('CLIENT :').bold().end, new Txt('Organisateur :').bold().end]).margin([0,10,0,0]).end)
    pdf.add(new Columns([new Txt(data.nom + " " + data.prenoms).end,
    new Txt(data.coursCommun ?  data.coursCommun.organisation.libelle : data.publicCible.coursCommun.organisation.libelle).end]).end)

    if(!data.coursCommun){

      pdf.add(new Columns([new Txt('NIVEAU :').bold().end, new Txt('FILIERE :').bold().end]).margin([0,10,0,0]).end)
      pdf.add(new Columns([new Txt(data.publicCible.niveau.libelle).end,
      new Txt(data.publicCible.filiere ?  data.publicCible.filiere.libelle : 'Non précisée').end]).end)
    
    }
    

    pdf.add(new Columns([new Txt('TOTAL :').bold().end,new Txt('EN PAIEMENT DE :').bold().end]).margin([0,10,0,0]).end)
    pdf.add(new Columns([new Txt(data.coursCommun ? data.coursCommun.cout : data.publicCible.cout + ' '+ 'FCFA').end,new Txt('Cours organisé').end]).end);

    pdf.footer('Imprimé le : ' + new Date().toDateString())


    pdf.create().open();

      });

   


  }

}
