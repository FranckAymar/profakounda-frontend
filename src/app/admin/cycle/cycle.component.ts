import { CycleService } from './../../services/cycle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {


  cycles = [];

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

}
