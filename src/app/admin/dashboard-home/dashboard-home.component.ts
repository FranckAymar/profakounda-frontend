import { URL } from './../../API_url/config';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  urlServer = URL.getPhoto;

  detailsDahboard = {} ;

  constructor(private dashboardService : DashboardService) { }

  ngOnInit() {
    this.onFetchDetailsDashboard() ;
  }

  onFetchDetailsDashboard(){
    this.dashboardService.fetchDetailsDashboard().subscribe(

      (resp)=>{
        console.log(resp);
        

        this.detailsDahboard = resp ;
      },
    )
  }

}
