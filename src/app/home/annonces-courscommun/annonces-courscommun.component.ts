import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonces-courscommun',
  templateUrl: './annonces-courscommun.component.html',
  styleUrls: ['./annonces-courscommun.component.css']
})
export class AnnoncesCourscommunComponent implements OnInit {

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
