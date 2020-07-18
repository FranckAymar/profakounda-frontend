import { SignInService } from './../services/sign-in.service';
import { Router } from '@angular/router';
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
  constructor(private coursCommunService : CoursCommunService,
    private router : Router,
      private signInService : SignInService) { }

  ngOnInit() {
    this.onFectCoursCommunHome();
  }


  onFectCoursCommunHome(){

    this.coursCommunService.fetchCoursCommunForHome().subscribe(

      (resp)=>{
        this.coursCommuns = resp['cours'] ;
        this.isNombreMaxAtteint = resp['nombreMaxAtteint'];
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

  goToDashboard(){


    if(localStorage.getItem(this.signInService.TOKEN) !==null){
      this.router.navigateByUrl('/customers/courscommun') ;

    }else{
      this.router.navigateByUrl('home/sign-in') ;

    }
  

  }



}
