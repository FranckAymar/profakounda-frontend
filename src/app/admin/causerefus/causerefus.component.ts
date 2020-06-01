import { CauserefusService } from './../services/causerefus.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-causerefus',
  templateUrl: './causerefus.component.html',
  styleUrls: ['./causerefus.component.css']
})
export class CauserefusComponent implements OnInit {

  causeRefus = [] ;
  causeRefusForm : FormGroup ;

  constructor(private formBuilder : FormBuilder,
              private causerefusService : CauserefusService) { }

  ngOnInit() {

    this.onFetchRefusDemande() ;
    this.initForm() ;
  }

  initForm(){
    this.causeRefusForm = this.formBuilder.group(

      {
        id : null ,
        titre : null,
        details : null 
      }
    )
  }

  onFetchRefusDemande(){

    this.causerefusService.fetchRefus().subscribe(

      (resp)=>{

        this.causeRefus = resp ;
      },

      (error)=>{

        console.log(error);
        
      }

    )


  }

  onSaveRefus() {

    this.causerefusService.saveRefus(this.causeRefusForm.value).subscribe(

      (resp)=>{

        this.onFetchRefusDemande();
      },

      (error)=>{

        console.log(error);
        

      }

    )

  }


  onLoadCauseRefus(cause){
    this.causeRefusForm.patchValue(

      {
        id : cause.id,
        titre : cause.titre,
        details : cause.details 
      }
    )
  }

}
