import { Component, OnInit, Input } from '@angular/core';
import { ParticulierService } from '../services/particulier.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Particulier } from '../models/Particulier.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm : FormGroup;
  @Input() invalidation:boolean = true;
  error :string;
  message:string;
  constructor(private particulierService:ParticulierService,private router:Router,private formBuilder:FormBuilder) { }
  ngOnInit() {
    this.formInitialisation();
  }
formInitialisation(){
  this.userForm = this.formBuilder.group({
    nom:['',Validators.required],
    prenoms:['',Validators.required],
    telephone:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    lieuHabitation:['',Validators.required],
    password:['',Validators.required],
    passwordConfirm:['',Validators.required]
  })
}
changement(){
  console.log(this.userForm.value['password']);
  if(this.userForm.value['password']===this.userForm.value['passwordConfirm'])
  {
    this.invalidation = false;
    this.message="Mots de passes identiques.";
  }
  else{
    this.invalidation = true;
    this.message = "Les deux mots de passes doivent êtres identiques";
  }
}
getColor(){
  if(!this.invalidation){
    return 'green';
  }
  else if(this.invalidation)
  {
    return 'red';
  }
}
  onSaveParticulier(){
    const formData = this.userForm.value;
    const particulier = new Particulier(
      formData['nom'],
      formData['prenoms'],
      formData['email'],
      formData['telephone'],
      formData['lieuHabitation'],
      formData['password'],
      formData['passwordConfirm']
    )
    this.particulierService.saveParticulier(particulier)
    .subscribe(
      (response)=>{
        this.formInitialisation();
        this.error =response["error"];
       
        if(response["success"])
        {
          this.router.navigate(["/home/sign-in"]);
        }
       
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

}
