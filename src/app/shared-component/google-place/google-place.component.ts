import { FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
declare var google; 


@Component({
  selector: 'app-google-place',
  templateUrl: './google-place.component.html',
  styleUrls: ['./google-place.component.css']
})
export class GooglePlaceComponent implements OnInit, AfterViewInit {


  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', {static: false}) addresstext: any;

  @Input() autocompleteInput: string;
  queryWait: boolean;

  constructor() {

  }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        types: [this.adressType] 
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

}
