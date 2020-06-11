import { Router, ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper, Img, Txt, QR, Columns } from 'pdfmake-wrapper';
import { CoursCommunService } from './../services/cours-commun-service.service';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { PaiementService } from './../../formations/services/paiement.service';
import { Component, OnInit } from '@angular/core';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { DatePipe } from '@angular/common';
import { URL } from 'src/app/API_url/config';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent implements OnInit {
urlServer  = URL.getLogoCoursCommun;
  paiements = [] ;
  myCoursCommuns = [];

  idCoursCommunSelect : number ;
  action : string ;

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
operateur:string;
color:string;
  constructor(private paiementService : PaiementService,
            private signInService : SignInService,
            private coursCommunService : CoursCommunService,
            private datePipe: DatePipe, 
            private router : Router,
            private route : ActivatedRoute) { }

  ngOnInit() {

    this.getParamsURL() ;

    this.onFetchPayment(this.page) ;
    this.onFetchCoursCommun();
  }

  onFetchPayment(pageActive) {

    this.page = pageActive ;

    let username = localStorage.getItem(this.signInService.USERNAME);

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


  processToPrintRecuFromMail(idCoursCommun){

    this.coursCommunService.fectchCoursCommunSelect(idCoursCommun).subscribe(

      (resp)=>{

        if(resp.code === 0){
          this.onGenerateRecuPaiement(resp.response);
        }else{
          this.router.navigateByUrl('/error404') ;
        }

      },

      (error)=>{

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
    pdf.add(new Txt('www.profakounda.com').alignment('center').margin([50,-10,0,0]).end)
    if(data.modePaiement=="OM_SKAN")
    {
      this.operateur="Orange money"
      this.color = "orange"
    }
    else if(data.modePaiement=="MOMO_SKAN"){
      this.operateur = "Mtn money"
      this.color = "yellow"
    }
    else if(data.modePaiement="MOOV_SKAN"){
      this.operateur = "Moov money"
      this.color = "green"
    }
    else{
      this.operateur = "";
      this.color = "black"
    }
    
 
    
    new Img(this.urlServer+'/'+data.coursCommun.id).width(150).margin([0,-10,0,30]).build().then( img => {
    pdf.add(new Columns([img, new QR(data.codeInscription.toString()).fit(100).alignment('right').end]).end)
    pdf.add(new Txt((data.coursCommun ? data.coursCommun.titre : data.publicCible.coursCommun.titre)+'-Recu de paiement').bold().alignment('center').decoration('underline').margin([0,20,0,20]).end)
    pdf.add(new Txt('Date : ' + this.datePipe.transform(data.dateInscription, 'dd-MMMM-yyyy')).margin([0,10,0,0]).end)
    pdf.add(new Txt('Code:').margin([0,10,0,0]).bold().end)
    pdf.add(data.codeInscription)
    pdf.add(new Columns([new Txt('Participant:').bold().end, new Txt('Organisateur :').bold().end]).margin([0,10,0,0]).end)
    pdf.add(new Columns([new Txt(data.nom + " " + data.prenoms).end,
    new Txt(data.coursCommun ?  data.coursCommun.organisation.libelle : data.publicCible.coursCommun.organisation.libelle).end]).end)

    if(!data.coursCommun){

      pdf.add(new Columns([new Txt('NIVEAU :').bold().end, new Txt('FILIERE :').bold().end]).margin([0,10,0,0]).end)
      pdf.add(new Columns([new Txt(data.publicCible.niveau.libelle).end,
      new Txt(data.publicCible.filiere ?  data.publicCible.filiere.libelle : 'Non précisée').end]).end)
    
    }
    

    pdf.add(new Txt('Montant :').margin([0,10,0,0]).bold().end)
    pdf.add(new Txt(data.coursCommun ? data.coursCommun.cout : data.publicCible.cout + 'FCFA').end);
    pdf.add(new Txt('Operateur:').margin([0,10,0,0]).bold().end)
    pdf.add(new Txt(this.operateur).color(this.color).end)
    pdf.add(new Txt('Téléphone:').margin([0,10,0,0]).bold().end)
    pdf.add(new Txt(data.numeroPaiement).end)
    pdf.footer(new Txt('Toute tentative de falsification est passive de poursuites judiciaires.').alignment('center').end);

    
    pdf.create().download('Recu_profAkounda_'+data.nom );

      });
      

   


  }



  getParamsURL() {
    
    this.route.queryParams.subscribe(params => {
       this.action = params['action'];
       this.idCoursCommunSelect = params['id'] ;

       if(this.action  === 'print'){

        this.processToPrintRecuFromMail(this.idCoursCommunSelect) ;
       }

  });
    
}
   
}
