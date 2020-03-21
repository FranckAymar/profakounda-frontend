import { CycleService } from './../../services/cycle.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cycle } from 'src/app/model/cycle.model';
import $ from 'jquery'

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {


  cycles = [];
  erreur :string;
  constructor(private cycleService : CycleService) { }

  ngOnInit() {

    this.onFetchCycles() ;
  }

  onFetchCycles() {

    this.cycleService.fetchCycles().subscribe(

      (response)=> {
        this.cycles = response.response ;
        console.log(response.response)
      },

      (error)=> {

        console.log("Une erreur est survenue");
        
      }

    )

  }

  onSaveCycle(formData){
    const cycle = new Cycle(0,formData['libelle']);
    this.cycleService.onSaveCycle(cycle)
    .subscribe(
      (response)=>{
      
        this.onFetchCycles();
      },
      (error)=>{
        console.log('Une erreure à survenue: '+ error);
      }
    )
  }

  deleteCycle(id:number){
    const cycle = new Cycle(id,"");
    this.cycleService.onDeleteCycle(cycle)
    .subscribe(
      (reponse)=>{
        this.erreur = reponse['error'];
        this.onFetchCycles();
      },
      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }

}
