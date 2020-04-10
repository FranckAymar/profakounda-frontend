import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { consts } from '../../API_url/const'
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { NiveauService } from 'src/app/admin/services/niveau.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  


  loading: boolean = false;
   @Input() id:number;
   @Input() url:string ; 
   @Input() invalidation:boolean = false;
   @Input() showMessage:boolean = false;
   message:string;

  @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
  filieres=[] ;
  niveaux = [];
  userForm : FormGroup;
  passwordForm : FormGroup;
  
  constructor(private filiereService :FiliereService,
              private niveauService:NiveauService,
              private particulierService:ParticulierService,
              private router:Router,
              private formBuilder:FormBuilder,
              private signInService:SignInService) { }

  ngOnInit() {
    this.init();
    this.rechercherPaticulierConnecter();
    this.onFetchNiveaux();
    this.onFetchFiliere();
    this.initPassword();
  }

 
init(){
  this.userForm = this.formBuilder.group({
    nom:['',Validators.required],
    prenoms:['',Validators.required],
    telephone:['',Validators.required],
    lieuHabitation:['',Validators.required],
    filiere:'',
    niveau:'',
    photo:null
  })
}
initPassword(){
  this.passwordForm = this.formBuilder.group({
    lastPassword:['',Validators.required],
    password:['',Validators.required],
    passwordConfirm:['',Validators.required],
    username:sessionStorage.getItem(this.signInService.USERNAME)
  })
}

changement(){
  if(this.passwordForm.value['password']===this.passwordForm.value['passwordConfirm'])
  {
    this.invalidation = false;
    this.showMessage = true;
    this.message="Mots de passes identiques.";
  }
  else{
    this.invalidation = true;
    this.showMessage = true
    this.message = "Les deux mots de passes doivent êtres identiques";
  }
}
changeValidation(){
  if(this.passwordForm.value['password'].length !=0)
  {
    this.invalidation = true;
  }
  else{
    this.showMessage = false;
    this.invalidation = false;
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

  rechercherPaticulierConnecter(){
    this.particulierService.rechercherParticulier(sessionStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (reponse)=>{
       this.id = reponse['id'];
       this.url = consts.host+ consts.nameProject+"photoParticulier/"+this.id;
        this.userForm.patchValue({
          nom: reponse['nom'],
          prenoms: reponse['prenoms'],
          telephone: reponse['telephone'],
          lieuHabitation: reponse['lieuHabitation'],
          filiere: reponse['filiere'],
          niveau: reponse['niveau'],
        
        })
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.userForm.get('photo').setValue(file);
    }
  }

  private prepareSave(): any {

    console.log(sessionStorage.getItem(this.signInService.USERNAME));

    let input = new FormData();
    input.append('nom', this.userForm.get('nom').value);
    input.append('prenoms', this.userForm.get('prenoms').value);
    input.append('telephone', this.userForm.get('telephone').value);
    input.append('lieuHabitation', this.userForm.get('lieuHabitation').value);
    input.append('filiere', this.userForm.get('filiere').value);
    input.append('niveau', this.userForm.get('niveau').value);
    input.append('username', sessionStorage.getItem(this.signInService.USERNAME));
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
  changePassword(){
    console.log(this.passwordForm.value);
    let token = btoa(this.signInService.USERNAME + ':' + this.passwordForm.value['lastPassword']);
    console.log("Criptage....");
    console.log(this.passwordForm.value['lastPassword']);
    console.log(token);
    console.log("Token de Session...");
    let sesToken = sessionStorage.getItem(this.signInService.TOKEN);
    console.log(sesToken);
    if(token === sesToken)
    {
      console.log("Tokens identiques");
    }
    else
    {
      console.log("Tokens differents");
    }
  }
  onUpdateParticulier(){
    const formModel = this.prepareSave();
    this.particulierService.modifierParticulier(formModel)
    .subscribe(
      (response)=>{
        alert("Modification effectuée avec succès."); 
        this.rechercherPaticulierConnecter();
        window.location.reload(false);
        this.clearFile();
       
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
