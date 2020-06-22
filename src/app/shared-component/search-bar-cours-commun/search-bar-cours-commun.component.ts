import { Router, ActivatedRoute } from '@angular/router';
import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VilleService } from 'src/app/admin/services/ville.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar-cours-commun',
  templateUrl: './search-bar-cours-commun.component.html',
  styleUrls: ['./search-bar-cours-commun.component.css']
})
export class SearchBarCoursCommunComponent implements OnInit {
  myGroup;
  organisationObject:any = [];
  listeOrganisation: Observable<any[]>
  myControl = new FormControl();
  code ;
  organisationName:String;
  
  @Output() getCoursCommunFiltrees = new EventEmitter<[]>() ;

  constructor(private coursCommunService : CoursCommunService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {

    this.onFetchOrganisationObject();

    this.listeOrganisation = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(valeur => this.filterOrganisation(valeur))
    );

    this.getParameterUrl();
    this.getNameUrl();
    if(this.code){
      this.onFilterCoursCommun();
    }
    this.myGroup = new FormGroup({
      organisation: new FormControl()
    });

  }

  
  onFilterCoursCommun(){
    this.addParameterInURl();
    this.coursCommunService.rechercherParCode(this.code).subscribe(
      (resp)=>{
<<<<<<< HEAD
console.log(resp)
=======
        if(resp["cours"])
      {
        this.getCoursCommunFiltrees.emit(resp["cours"]);
       }
      else{
>>>>>>> 28cefe484b4380f6c946393a37e8711106710de7
        this.getCoursCommunFiltrees.emit(resp);
       console.log(resp);
      }
      }
    )
  }

  onFilterCoursCommunByOrganisationName(){
   
    this. addNameInURl();
    this.coursCommunService.rechercherParOrganisation(this.organisationName).subscribe(
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

  //ajouter le non a l'url
  addNameInURl() {
   
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        organisationName: this.organisationName ,

      },
      queryParamsHandling: 'merge',
    });
  }

     //Recuperer criterRecherche dans l'URL
     getNameUrl() {

      this.route.queryParams.subscribe(params => {
  
        this.organisationName = params['organisationName'];
  
      });
    }

  onFetchOrganisationObject() {
    this.coursCommunService.fetchOrganisationList().subscribe(
      (response)=> {
        this.organisationObject = response;
        console.log(response);
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  private filterOrganisation(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.organisationObject.filter(option => option.libelle.toLowerCase().includes(filterValue));
  }

}
