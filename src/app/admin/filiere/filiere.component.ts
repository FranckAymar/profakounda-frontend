import { Filiere } from './../../model/filiere';
import { FiliereService } from './../../services/filiere.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {

  
  filieres  = [] ;
  filiere : Filiere ={};
  message : string;

  classForm: FormGroup

  constructor(private filiereService : FiliereService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.onFetchFiliere() ;
    this.initForm();
  }
 
  initForm() {

    this.classForm = this.formBuilder.group({

      id: [null],
      libelle: [null, Validators.required],

    });

  }

  //recuperer les filieres
  onFetchFiliere() {

    this.filiereService.fetchFilieres().subscribe(

      (response)=> {
        this.filieres = response.response ;
        console.log(response.response)
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

        this.onFetchFiliere();
        this.message = "Enregistrement effectué avec succès"
        this.filiere={};
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


        this.onFetchFiliere();
        alert("suppression  effectué avec succès");
      },
      (error) => {

        console.log("Une erreur est survenue"+error);

      }

    );


  }

}
