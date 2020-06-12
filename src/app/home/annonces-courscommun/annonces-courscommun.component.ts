import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonces-courscommun',
  templateUrl: './annonces-courscommun.component.html',
  styleUrls: ['./annonces-courscommun.component.css']
})
export class AnnoncesCourscommunComponent implements OnInit {

  coursCommuns = [] ;
isNombreMaxAtteint:boolean = false;
  constructor(private coursCommunService : CoursCommunService) { }

  ngOnInit() {
    this.onFectCoursCommunHome();
  }


  onFectCoursCommunHome(){

    this.coursCommunService.fetchCoursCommunForHome().subscribe(

      (resp)=>{
        console.log(resp);
        this.coursCommuns = resp['cours'] ;
        this.isNombreMaxAtteint = resp['nombreMaxAtteint'];
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }


}
