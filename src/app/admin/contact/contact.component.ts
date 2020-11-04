import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from 'src/app/shared-component/services/contact-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:ContactServiceService) { }
  contacts:any = [];
  ngOnInit() {
    this.onFetchAllContacts();
  }

  onFetchAllContacts(){
    this.contactService.getAllContactsMessages().subscribe(
      (response)=>{
        this.contacts = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
