import { Component, OnInit } from '@angular/core';
import { CoursCommunAdminService } from '../services/cours-commun-admin.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  virements = [];
  constructor(private coursCommunAdminService : CoursCommunAdminService) { }

  ngOnInit() {
    this.onFetchVirements();
  }

  onFetchVirements(){

    
    this.coursCommunAdminService.virements().subscribe(

      (resp) => {
       
       this.virements = resp;
      
       
      },

      (error) => {
        console.log(error);
        

      }

    )
  }
}
