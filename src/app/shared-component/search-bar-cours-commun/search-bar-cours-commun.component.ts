import { Router, ActivatedRoute } from '@angular/router';
import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-cours-commun',
  templateUrl: './search-bar-cours-commun.component.html',
  styleUrls: ['./search-bar-cours-commun.component.css']
})
export class SearchBarCoursCommunComponent implements OnInit {


  code ;

  @Output() getCoursCommunFiltrees = new EventEmitter<[]>() ;

  constructor(private coursCommunService : CoursCommunService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {

    this.getParameterUrl();

    if(this.code){
      this.onFilterCoursCommun();
    }
  }

  onFilterCoursCommun(){

    this.addParameterInURl();
    this.coursCommunService.rechercherParCode().subscribe(

      (resp)=>{

        this.getCoursCommunFiltrees.emit(resp);
      }
    )
  }

  addParameterInURl() {
   
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          code: this.code ,

        },
        queryParamsHandling: 'merge',
      });
    }


    //Recuperer criterRecherche dans l'URL
  getParameterUrl() {

    this.route.queryParams.subscribe(params => {

      this.code = params['code'];

    });
  }


}
