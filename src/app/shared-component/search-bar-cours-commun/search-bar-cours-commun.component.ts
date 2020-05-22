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
  villes : any = [];
  villesObject:any = [];
  filteredOptions2: Observable<string[]>
  myControl2 = new FormControl();
  code ;
  organisationName:String;
  
  @Output() getCoursCommunFiltrees = new EventEmitter<[]>() ;

  constructor(private coursCommunService : CoursCommunService,
              private router : Router,
              private route : ActivatedRoute,private villeService : VilleService) { }

  ngOnInit() {


    this.onFetchVilles();
    this.onFetchVillesObject();

    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
      map(v => this._filter2(v))
    );


    this.getParameterUrl();
    this.getNameUrl();
    if(this.code){
      this.onFilterCoursCommun();
    }
    this.myGroup = new FormGroup({
      ville: new FormControl()
    });

  }

  
  onFilterCoursCommun(){

    this.addParameterInURl();
    this.coursCommunService.rechercherParCode(this.code).subscribe(
      (resp)=>{

        this.getCoursCommunFiltrees.emit(resp);
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

     onFetchVilles() {
    this.villeService.onFetchVillesString().subscribe(
      (response)=> {
        this.villes = response;
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  onFetchVillesObject() {
    this.villeService.onFetchVilles().subscribe(
      (response)=> {
        this.villesObject = response;
        console.log(response);
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.villesObject.filter(option => option.designation.toLowerCase().includes(filterValue));
  }

}
