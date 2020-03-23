import { CycleService } from './../../services/cycle.service';
import { ClasseService } from './../../services/classe.service';
import { Classe } from './../../model/classe';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  classes = [];
  cycles = [];
  classe: Classe = {};
  message: string;

  classForm: FormGroup

  constructor(private classeService: ClasseService,
    private cycleService: CycleService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.onFetchClasses();
    this.onFetchCycles();
    this.initForm();
  }


  initForm() {

    this.classForm = this.formBuilder.group({

      id: [null],
      cycleId: [null, Validators.required],
      libelle: [null, Validators.required],

    });

  }

  //Recuperer les classes
  onFetchClasses() {

    this.classeService.fetchClasses().subscribe(

      (response) => {

        this.classes = response.response;

      },

      (error) => {

        console.log("Une erreur est survenue");
      }
    )

  }


  onSaveClasse() {

    this.classeService.saveClasse(this.classForm.value).subscribe(

      (response) => {

        this.onFetchClasses();
        this.message = "Enregistrement effectué avec succès"

      },
      (error) => {

        console.log("Une erreur est survenue");

      }

    );


  }



  onDeleteClasse(id: number) {

    this.classeService.deleteClasse(id).subscribe(

      (response) => {

        this.onFetchClasses();
        alert('Supprimer avec succès');

      },
      (error) => {

        console.log("Une erreur est survenue");

      }

    );

  }


  onLoadClass(classeLoad: any) {

    this.initialisation() ;

    this.classForm.patchValue({
      id: classeLoad.id
    });

    this.classe.libelle = classeLoad.libelle;
    this.classe.cycleId = classeLoad.cycle.id;


  }

  onFetchCycles() {

    this.cycleService.fetchCycles().subscribe(

      (response) => {
        this.cycles = response.response;
      },

      (error) => {

        console.log("Une erreur est survenue");

      }

    )

  }


  initialisation() {

    this.classe = {} ;
    this.message = "" ;

  }

}
