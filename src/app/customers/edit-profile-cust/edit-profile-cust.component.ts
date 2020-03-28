import { SignInService } from '../../home/services/sign-in.service';
import { ParticulierService } from '../../home/services/particulier.service';
import { NiveauService } from './../../admin/services/niveau.service';
import { FiliereService } from './../../admin/services/filiere.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-cust',
  templateUrl: './edit-profile-cust.component.html',
  styleUrls: ['./edit-profile-cust.component.css']
})
export class EditProfileCustComponent implements OnInit {


  loading: boolean = false;

  @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
  filieres=[] ;
  niveaux = [];
  userForm : FormGroup;
  constructor(private filiereService :FiliereService,
              private niveauService:NiveauService,
              private particulierService:ParticulierService,
              private formBuilder:FormBuilder,
              private signInService:SignInService) { }

  ngOnInit() {
    

    this.onFetchNiveaux();
    this.onFetchFiliere();
    this.formInitialisation();
  }
  formInitialisation(){
    this.userForm = this.formBuilder.group({
      id:null,
      nom:['',Validators.required],
      prenoms:['',Validators.required],
      telephone:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      lieuHabitation:['',Validators.required],
      filiere:[''],
      niveau:[''],
      password:['',Validators.required],
      photo:null
    })
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.userForm.get('photo').setValue(file);
    }
  }

  private prepareSave(): any {


    let input = new FormData();
    let username = sessionStorage.getItem(this.signInService.USERNAME) ;
    input.append('nom', this.userForm.get('nom').value);
    input.append('prenoms', this.userForm.get('prenoms').value);
    input.append('telephone', this.userForm.get('telephone').value);
    input.append('email', this.userForm.get('email').value);
    input.append('lieuHabitation', this.userForm.get('lieuHabitation').value);
    input.append('filiere', this.userForm.get('filiere').value);
    input.append('niveau', this.userForm.get('niveau').value);
    input.append('password', this.userForm.get('password').value);
    input.append('username', username);
    input.append('photo', this.userForm.get('photo').value);
    return input;
  }
  clearFile() {
    this.userForm.get('photo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  onFetchNiveaux() {
    this.niveauService.fetchNiveaux().subscribe(
      (response)=> {
        this.niveaux = response;
      },

      (error)=> {

        console.log("Une erreur est survenue");
        
      }

    )

  }
  onUpdateParticulier(){
    const formModel = this.prepareSave();
    this.particulierService.modifierParticulier(formModel)
    .subscribe(
      (response)=>{
        console.log(response);
        this.clearFile();
        this.formInitialisation();
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }
  //recuperer les filieres
  onFetchFiliere() {

    this.filiereService.fetchFilieres().subscribe(

      (response)=> {
        this.filieres = response.response ;
      },

      (error)=> {

        console.log("Une erreur est survenue");
        
      }
    )

  }
}
