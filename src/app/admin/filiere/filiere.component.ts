import { Filiere } from '../model/filiere';
import { FiliereService } from '../services/filiere.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',  
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {

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

  filieres=[] ;
  filiere: Filiere ={}; 
  message: string;

  classForm: FormGroup;

  constructor(private filiereService: FiliereService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.onFetchFiliere(this.page) ;
    this.initForm();
  }
 
  initForm() {

    this.classForm = this.formBuilder.group({

      id: [null],
      libelle: [null, Validators.required],

    });

  }

  onLoadFiliere(filiereLoad: any) {

    this.initialisation() ;
    this.classForm.patchValue({
      id: filiereLoad.id
    });
    this.filiere.libelle = filiereLoad.libelle;
    this.filiere.id = filiereLoad.id;
  }

  initialisation() {

    this.filiere = {id:null,libelle:""} ;
    this.classForm.patchValue({
      id: null
    });
    this.message = "" ;

  }
  //recuperer les filieres
  onFetchFiliere(pageActive) {

    this.page = pageActive ;
    
    this.filiereService.fetchFilieres(this.page, this.numberDataOfPage).subscribe(

      (resp)=> {

        this.sizeData = resp.totalData ;
        
        this.totalPage = (this.sizeData/this.numberDataOfPage) ; 
        
        if(this.sizeData % this.numberDataOfPage != 0){
          this.totalPage =  Math.ceil(this.totalPage) ;
        } 
        

        this.totalPageArray = new Array(this.totalPage);

        this.filieres = resp.data ;
      },

      (error)=> {

        console.log("Une erreur est survenue");
        
      }
    )

  }

  // enregistrerFiliere
  onSaveFiliere() {

    this.filiereService.enregistrerFiliere(this.classForm.value).subscribe(

      (response) => {

        this.onFetchFiliere(this.page);
        this.message = "Enregistrement effectué avec succès"
        this.initialisation();
      },
      (error) => {

        console.log("Une erreur est survenue");

      }

    );


  }

  ondeleteFiliere(id:number) {

    const fil = new Filiere(id,"");
    this.filiereService.supprimerFiliere(fil).subscribe(
     (response) => {


        this.onFetchFiliere(this.page);
        alert("suppression  effectué avec succès");
      },
      (error) => {

        console.log("Une erreur est survenue"+error);

      }

    );


  }

}
