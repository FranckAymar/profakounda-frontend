import { Component, OnInit, Input } from '@angular/core';
import { JourService } from 'src/app/customers/services/Jour.service';
import { Jour } from 'src/app/customers/models/jour.model';
import { error } from 'protractor';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map} from 'rxjs/operators';
@Component({
  selector: 'app-jour',
  templateUrl: './jour.component.html',
  styleUrls: ['./jour.component.css']
})
export class JourComponent implements OnInit {
  jours:any = [];
  filterCountry:any = [];
  jour:Jour = new Jour(0,'',[]);
  @Input() designationJour:string
  error:string;
  constructor(private jourService:JourService) { }
  myControl = new FormControl();
  options: string[] = ['Angular', 'ReactJs', 'VuJs'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.onFetchJours();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  initJour(){
this.jour = new Jour(0,'',[]);
  }
  upDateJour(day){
    this.jour = new Jour(day.id,day.designation,[]);
      }
  onFetchJours()
  {
    this.jourService.onFetchJours()
    .subscribe(
      (response)=>{
        this.jours = response;
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

  onSaveJour(){
    if(this.jour.id != 0)
    {
      this.jourService.modifierJour(this.jour).subscribe(
        (reponse)=>{
          this.jour = new Jour(0,'',[]);
          this.onFetchJours();
          document.getElementById('ajouterJour').click();
        },
        (error)=>{
          console.log("Echec de modification du jour: "+error);
        }
      )
    }else
    {
      this.jourService.enregistrerJour(this.jour).subscribe(
        (reponse)=>{
          this.jour = new Jour(0,'',[]);
          this.onFetchJours();
          document.getElementById('ajouterJour').click();
        },
        (error)=>{
          console.log("Echec d'enregistrement du jour: "+error);
        }
      )
    }
  }

  supprimerJour(id){
    this.jourService.supprimerJour(id).subscribe(
      (response)=>{
        this.error = response['error'];
        this.onFetchJours();
      },
      (error)=>{
        console.log("Error de suppression: "+error);
      }
    )
  }


  searchDay(string) {

    var output = [];
    this.jours.forEach((jour, index) => {
      if (jour.designation.toLowerCase().indexOf(
        string.toLowerCase()) >= 0) {
      output.push(jour);
      if (string.length === 0) {
        output.length = 0;
        console.log("JourId vide");
      }

    } else {
      console.log("JourId vide");
    }
    });
    this.filterCountry = output;
    
  }
  fillTextbox7(objet) {
   console.log(objet);
  }

}
