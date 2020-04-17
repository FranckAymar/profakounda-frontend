import { Component, OnInit } from '@angular/core';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { Niveau } from 'src/app/admin/model/niveau.model';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {

  niveaux : [];
  erreur :string;
  niveau1:Niveau = new Niveau(0,"");
  niveau:Niveau = new Niveau(0,"");

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

  constructor(private niveauService:NiveauService) { }

  ngOnInit() {
    this.onFetchNiveaux(this.page);
  }

  onFetchNiveaux(pageActive) {

    this.page = pageActive ;

    this.niveauService.fetchNiveaux(this.page, this.numberDataOfPage).subscribe(
      (resp)=> {


        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);

        this.niveaux = resp.data;
      },

      (error)=> {

        console.log("Une erreur est survenue");
        
      }

    )

  }

  onSaveNiveau(formData){
    this.niveauService.onSaveNiveau(formData)
    .subscribe(
      (response)=>{
        this.niveau = new Niveau(0,"");
        document.getElementById('ajouterNiveau').click();
        this.onFetchNiveaux(this.page);
      },
      (error)=>{
        console.log('Une erreure à survenue: '+ error);
      }
    )
  }

  onUpdateNiveau(formData){
    console.log(formData);
    this.niveauService.updateNiveau(formData)
    .subscribe(
      (response)=>{
        this.niveau1 = new Niveau(0,"");
        document.getElementById('updateNiveau').click();
        this.onFetchNiveaux(this.page);
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

  deleteNiveau(id:number){
    const niv = new Niveau(id,"");
    this.niveauService.onDeleteNiveau(niv)
    .subscribe(
      (reponse)=>{
        this.erreur = reponse['error'];
        this.onFetchNiveaux(this.page);
      },
      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }


  getNiveau(id:number){
    const niveau = new Niveau(id,"");
    this.niveauService.getNiveau(niveau)
    .subscribe(
      (reponse)=>{
       this.niveau1.id = reponse["id"];
       this.niveau1.libelle = reponse["libelle"]
      },
      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }

}
