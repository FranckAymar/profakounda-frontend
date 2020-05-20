import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cours-commun',
  templateUrl: './list-cours-commun.component.html',
  styleUrls: ['./list-cours-commun.component.css']
})
export class ListCoursCommunComponent implements OnInit {

  coursCommuns = [] ;

  constructor(private coursCommunService : CoursCommunService) { }

  ngOnInit() {
    this.onFectCoursCommunHome();
    }

  onFectCoursCommunHome(){

    this.coursCommunService.fetchCoursCommunForHome().subscribe(

      (resp)=>{
        console.log(resp);
        this.coursCommuns = resp ;
        alert("voila "+this.coursCommuns)
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

  filterCoursCommunParCode(coursCommun){

    this.coursCommuns = coursCommun ;
  }

}
