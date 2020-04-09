import { URL } from 'src/app/API_url/config';
import { ActivatedRoute } from '@angular/router';
import { DetaisFormationsService } from './../services/detais-formations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { log } from 'util';
@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {


  lat: number = 5.338390;
  lng: number = -4.097748;
  radius: number = 1000;

  urlServer = URL.getPhoto


  idPropositionFormation : number ;

  propositionFormation = {} ;

  constructor(private detaisFormationsService : DetaisFormationsService,
              private route : ActivatedRoute) { }

  ngOnInit() {

    this.initJquerry() ;
    this.getIdFormation();
    this.onGetDetailPropositionFormation() ; 
  }


  ajoutMarqueur(lat: number, lng: number) {

    this.lat = lat;
    this.lng = lng;

  }



  changeRaduis(radius) {

    this.radius = radius;

  }


  getIdFormation() {

                            
    this.route.params.subscribe(

      ( p ) =>{
         this.idPropositionFormation = p['id'] ;
   
      }
    ) ;

  }


  onGetDetailPropositionFormation() {

    this.detaisFormationsService.getDetailFormation(this.idPropositionFormation).subscribe(

      (resp)=> {
       
        this.propositionFormation = resp ;
        
      },


      (error)=> {
          console.log(error);
          
      }
    )

  }


  initJquerry() {


    $(document).ready(function () {

      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;

      $(".next").click(function () {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              'display': 'none',
              'position': 'relative'
            });
            next_fs.css({ 'opacity': opacity });
          },
          duration: 600
        });
      });

      $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              'display': 'none',
              'position': 'relative'
            });
            previous_fs.css({ 'opacity': opacity });
          },
          duration: 600
        });
      });


    });

  }



}
