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

    this.coursCommunService.fetchCoursCommun().subscribe(

      (resp)=>{
        console.log(resp);
        this.coursCommuns = resp ;
        
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

}
