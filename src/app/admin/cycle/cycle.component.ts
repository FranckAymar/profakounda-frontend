import { CycleService } from './../../services/cycle.service';
import { Component, OnInit } from '@angular/core';
import { Cycle } from 'src/app/model/cycle.model';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {


  cycles = [];
  erreur :string;
  cycle1:Cycle = new Cycle(0,"");
  cycle:Cycle = new Cycle(0,"");

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
    
    this.cycleService.onSaveCycle(formData)
    .subscribe(
      (response)=>{
      
        this.cycle = new Cycle(0,"");
        document.getElementById('ajouterCycle').click();

        this.onFetchCycles();
      },
      (error)=>{
        console.log('Une erreure à survenue: '+ error);
      }
    )
  }

  onUpdateCycle(formData){
    const  c = formData;
    this.cycleService.updateCycle(c)
    .subscribe(
      (response)=>{
        this.cycle1 = new Cycle(0,"");
        document.getElementById('updateCycle').click();
        this.onFetchCycles();
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }
  getCycle(id:number){
    const cycle = new Cycle(id,"");
    this.cycleService.getCycle(cycle)
    .subscribe(
      (reponse)=>{
       this.cycle1.id = reponse["id"];
       this.cycle1.libelle = reponse["libelle"]
       console.log(this.cycle1);
      },
      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
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
