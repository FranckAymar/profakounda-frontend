import { SnackbarService } from './../../shared-component/services/snackbar.service';
import { Component, OnInit, Input } from '@angular/core';
import { ParticulierService } from '../../customers/services/particulier.service';
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
  mailSaisi:String
  inscriptionSucess : boolean = false ;
  constructor(private particulierService:ParticulierService,
              private router:Router,
              private formBuilder:FormBuilder,
              private snackbarService : SnackbarService) { }
 
  ngOnInit() {
    this.formInitialisation();
  }
formInitialisation(){
  this.userForm = this.formBuilder.group({
    nom:['',Validators.required],
    prenoms:['',Validators.required],
    telephone:[''],
    email:['',[Validators.required,Validators.email]],
    lieuHabitation:'',
    password:['',Validators.required],
    passwordConfirm:['',Validators.required]
  })
}
changement(){
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
      0,
      formData['nom'],
      formData['prenoms'],
      formData['email'],
      '',
      formData['lieuHabitation'],
      formData['password'],
      formData['passwordConfirm']
    )
    this.particulierService.saveParticulier(particulier)
    .subscribe(
      (response)=>{
        localStorage.setItem("mail",particulier.email);
        this.mailSaisi = localStorage.getItem("mail");
        this.formInitialisation();
        this.error =response["error"];      
        if(response["success"])
        { 
          this.inscriptionSucess = true ;
          this.message = "";
          this.snackbarService.openSnackBar('Inscription effectuée avec succès');
          this.router.navigate(["/home/sign-up"]);
          this.formInitialisation();
       
        }
   
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

  onRevoyerEmail(){
    this.mailSaisi = sessionStorage.getItem("mail");
    this.particulierService.revoyerEmail(this.mailSaisi).subscribe(
      (response)=>{
        this.snackbarService.openSnackBar('Mail de confirmation renvoyé avec succès')
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

}
