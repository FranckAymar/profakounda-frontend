import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoursCommunAdminService } from '../services/cours-commun-admin.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidebarComponent implements OnInit {

  constructor(private coursCommunService:CoursCommunAdminService) { }
nombreDemandeVirement:any;
  ngOnInit() {
    this.onFechNombreDemandeVirement();
  }

  onFechNombreDemandeVirement(){
    this.coursCommunService.nombreDemandeVirement().subscribe(
      (resp)=>{
        this.nombreDemandeVirement = resp;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
