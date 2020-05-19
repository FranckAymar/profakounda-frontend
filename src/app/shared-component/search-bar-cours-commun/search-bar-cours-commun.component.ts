import { CoursCommunService } from './../../customers/services/cours-commun-service.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-cours-commun',
  templateUrl: './search-bar-cours-commun.component.html',
  styleUrls: ['./search-bar-cours-commun.component.css']
})
export class SearchBarCoursCommunComponent implements OnInit {

  @Output() getCoursCommunFiltrees = new EventEmitter<[]>() ;

  constructor(private coursCommunService : CoursCommunService) { }

  ngOnInit() {
  }

  onFilterCoursCommun(){

    this.coursCommunService.rechercherParCode().subscribe(

      (resp)=>{

        this.getCoursCommunFiltrees.emit(resp);
      }
    )
  }

}
