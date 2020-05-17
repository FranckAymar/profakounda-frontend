import { CoursCommunAdminService } from './../services/cours-commun-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-common-course',
  templateUrl: './admin-common-course.component.html',
  styleUrls: ['./admin-common-course.component.css']
})
export class AdminCommonCourseComponent implements OnInit {

  constructor(private coursCommunAdminService : CoursCommunAdminService) { }

  courCommuns= [];

  ngOnInit() {

    this.onFetchCoursCommuns();
  }

  onFetchCoursCommuns(){

    
    this.coursCommunAdminService.fetchCoursCommun().subscribe(


      (resp) => {
        this.courCommuns = resp ;
        alert("okk on a "+this.courCommuns);
      },

      (error) => {
        console.log(error);
        

      }

    )
  }
}
