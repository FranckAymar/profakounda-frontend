import { ForfaitService } from '../services/forfait.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Forfait } from 'src/app/model/forfait';

@Component({
  selector: 'app-forfait',
  templateUrl: './forfait.component.html',
  styleUrls: ['./forfait.component.css']
})
export class ForfaitComponent implements OnInit {


  forfait : Forfait = {} ;
  forfaits = [] ;

  forfaitForm : FormGroup ;

  message : string =  "" ;

  constructor(private forfaitService : ForfaitService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {

    this.onFetchForfait() ;
    this.initForm() ;
  }


  initForm() {

    this.forfaitForm = this.formBuilder.group({

      id : [null],
      nbreJour : [null, Validators.required] ,
      nbreRequete : [null, Validators.required]

    }) ;

  }


  onFetchForfait() {

    this.forfaitService.fetchForfait().subscribe(

      (response)=> {
          console.log(response.response) ;
          this.forfaits = response.response ;
      },

      (error)=> {
          console.log(error);

      }

    );

  }

  onSaveForfait () {

    this.forfaitService.saveForfait(this.forfaitForm.value).subscribe(

      (response)=>{

        this.onFetchForfait() ;
        this.message = "Enregistré avec succès"
      
      },


      (error)=>{
        
        console.log(error);
        
      }

    ) ;
  }

  onDeleteForfait(id : number) {


    this.forfaitService.supprimerForfait(id).subscribe(

      (response) =>{

        this.onFetchForfait() ;
      } ,

      (error) =>{
        
        console.log(error);
        
      }
    );

  }

  onLoadForfait(forfaitLoad : any) {


    this.initialisation() ;

    this.forfaitForm.patchValue({
      id : forfaitLoad.id
    }) ;

    this.forfait.nbreJour = forfaitLoad.nbreJour ;
    this.forfait.nbreRequete = forfaitLoad.nbreRequete ;

  }


  initialisation() {

    this.message = "" ;
    this.forfait = {} ;

  }

}
