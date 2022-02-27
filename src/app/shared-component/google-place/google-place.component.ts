import { FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output, ViewChild, OnChanges } from '@angular/core';
declare var google; 


@Component({
  selector: 'app-google-place',
  templateUrl: './google-place.component.html',
  styleUrls: ['./google-place.component.css']
})
export class GooglePlaceComponent implements OnInit, AfterViewInit, OnChanges {


  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  @Input() autocompleteInput: string;
  queryWait: boolean;

  constructor() {

  }

  ngOnChanges(changes) {
    this.emitInput();
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
    this.setAddress.emit({data : place, input : this.autocompleteInput});
  }


  emitInput(){
    this.setAddress.emit({data : null, input : this.autocompleteInput});

  }
}
