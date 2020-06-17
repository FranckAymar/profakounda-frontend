import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cours-commun',
  templateUrl: './list-cours-commun.component.html',
  styleUrls: ['./list-cours-commun.component.css']
})
export class ListCoursCommunComponent implements OnInit {

  coursCommuns = [] ;


  //Nombre de données à chargées à chaque page
  numberDataOfPage: number = 6;
  //Page courante
  page: number = 1;
  //Taille totale des données en base de données
  sizeData: number;
  //Nombre de page totals
  totalPage: number
  totalPageArray: Array<any>;

  constructor(private coursCommunService : CoursCommunService) { }

  ngOnInit() {
    this.onFectCoursCommunHome(this.page);
    }

  onFectCoursCommunHome(pageActive){

    this.page = pageActive ;

    this.coursCommunService.fetchCoursCommunForHomeGlobale(this.page, this.numberDataOfPage).subscribe(

      (resp)=>{

        console.log(resp);


        this.sizeData = resp.totalData;

        this.totalPage = (this.sizeData / this.numberDataOfPage);

        if (this.sizeData % this.numberDataOfPage != 0) {
          this.totalPage = Math.ceil(this.totalPage);
        }
 
        this.totalPageArray = new Array(this.totalPage);
        this.coursCommuns = resp.data ;
        
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
