import { Component, OnInit } from '@angular/core';
import { CommuneService } from '../services/commune.service';
import { VilleService } from '../services/ville.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commune } from '../model/commune.model';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {

  commune:Commune = {};
  communes:any = [];
  villes:any = [];
  communeForm: FormGroup
  constructor(private communeService:CommuneService,private villeService:VilleService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.onFetchCommunes();
    this.onFetchVilles();
    this.initForm();
  }
  initForm() {

    this.communeForm = this.formBuilder.group({

      id: [null],
      libelle: [null, Validators.required],
      villeId: [null, Validators.required],

    });

  }
  onSaveCommune(){
    this.communeService.saveCommune(this.communeForm.value).subscribe(
      (resp)=>{
        this.onFetchCommunes()
        this.onFetchVilles();
        document.getElementById('ajouterCommune').click();
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  onLoadCommune(communeLoad: any) {

    this.initialisation() ;

    this.communeForm.patchValue({
      id: communeLoad.id
    });

    this.commune.libelle = communeLoad.libelle;
    if(communeLoad.ville)
    {
      this.commune.villeId = communeLoad.ville.id;
    }
    else{
      this.commune.villeId = null;
    }
   

  }

  onFetchVilles(){
    this.villeService.onFetchVilles().subscribe(
      (resp)=>{
        this.villes = resp;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onFetchCommunes(){
    this.communeService.listCommunes().subscribe(
      (resp)=>{
        console.log(resp)
        this.communes = resp;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  initialisation() {

    this.commune = {} ;
    this.communeForm.patchValue(
      {
        id : null,
        libelle:"",
        villeId:null
      }
    )

  }
}
