import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { consts } from '../../API_url/const'
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { PasswordModel } from '../models/PasswordModel';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { VilleService } from 'src/app/admin/services/ville.service';
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
   @Input() filiere:string;
   @Input() niveau:string;
   @Input() ville:string;
   message:string;
   mes:string;
  @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
  filieres=[] ;
  niveaux = [];
  villes : any = [];
  passwordModel:PasswordModel;
  userForm : FormGroup;
  passwordForm : FormGroup;
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  filteredOptions3: Observable<string[]>
  filteredOptions2: Observable<string[]>
  filteredOptions: Observable<string[]>;
  constructor(private filiereService :FiliereService,
              private niveauService:NiveauService,
              private particulierService:ParticulierService,
              private villeService:VilleService,
              private router:Router,
              private formBuilder:FormBuilder,
              private signInService:SignInService) { }

  ngOnInit() {
    this.init();
    this.rechercherPaticulierConnecter();
    this.onFetchNiveaux();
    this.onFetchFiliere();
    this.onFetchVilles();
    this.initPassword();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions3 = this.myControl3.valueChanges
    .pipe(
      startWith(''),
      map(va => this._filter3(va))
    );
    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
      map(v => this._filter2(v))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.filieres.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.niveaux.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.villes.filter(option => option.toLowerCase().includes(filterValue));
  }

 
init(){
  this.userForm = this.formBuilder.group({
    nom:['',Validators.required],
    prenoms:['',Validators.required],
    telephone:['',Validators.required],
    lieuHabitation:['',Validators.required],
    filiere:'',
    niveau:'',
    ville:['',Validators.required],
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
        this.niveau = reponse['niveau'];
        this.filiere = reponse['filiere'];
        this.ville = reponse['ville'];
       this.id = reponse['id'];
       this.url = consts.host+ consts.nameProject+"photoParticulier/"+this.id;
        this.userForm.patchValue({
          nom: reponse['nom'],
          prenoms: reponse['prenoms'],
          telephone: reponse['telephone'],
          lieuHabitation: reponse['lieuHabitation'],
          filiere: reponse['filiere'],
          niveau: reponse['niveau'],
          ville: reponse['ville'],
        
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
    let input = new FormData();
    input.append('nom', this.userForm.get('nom').value);
    input.append('prenoms', this.userForm.get('prenoms').value);
    input.append('telephone', this.userForm.get('telephone').value);
    input.append('lieuHabitation', this.userForm.get('lieuHabitation').value);
    input.append('filiere', this.filiere);
    input.append('niveau', this.niveau);
    input.append('ville', this.ville);
    input.append('username', sessionStorage.getItem(this.signInService.USERNAME));
    input.append('photo', this.userForm.get('photo').value);
    return input;
  }
  clearFile() {
    this.userForm.get('photo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  onFetchNiveaux() {
    this.niveauService.fetchNiveauxString().subscribe(
      (response)=> {
        this.niveaux = response;
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  onFetchVilles() {
    this.villeService.onFetchVillesString().subscribe(
      (response)=> {
        this.villes = response;
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  changePassword(){
    let token = btoa( sessionStorage.getItem(this.signInService.USERNAME) + ':' + this.passwordForm.value['lastPassword']);
    let sesToken = sessionStorage.getItem(this.signInService.TOKEN);
    if(token === sesToken)
    {
      let newToken = btoa( sessionStorage.getItem(this.signInService.USERNAME) + ':' + this.passwordForm.value['password']);
      this.passwordModel = new PasswordModel(this.passwordForm.value['lastPassword'],this.passwordForm.value['password'],this.passwordForm.value['passwordConfirm'],sessionStorage.getItem(this.signInService.USERNAME));
      this.particulierService.onChangePassword(this.passwordModel)
    .subscribe(
      (response)=>{
        alert("Modification effectuée avec succès.");
        this.initPassword();
        sessionStorage.setItem(this.signInService.TOKEN,newToken);
        this.mes = '';
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    ) 
    }
    else
    {
      this.mes = "Ancien mot de passe inexact";
      console.log("Ancien mot de passe inexact");
    }
  }
  onUpdateParticulier(){
    const formModel = this.prepareSave();
    this.particulierService.modifierParticulier(formModel)
    .subscribe(
      (response)=>{
        alert("Modification effectuée avec succès."); 
        this.rechercherPaticulierConnecter();
      
        //Rechargementt du component courant
        this.router.navigateByUrl('customers', { skipLocationChange: true }).then(() => {
          this.router.navigate(['customers/editprofil']);
      }); 
        // window.location.reload(false);
        this.clearFile();
       
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    ) 
  }
  //recuperer les filieres
  onFetchFiliere() {
    this.filiereService.fetchFilieresString().subscribe(
      (response)=> {
        this.filieres = response ;
      },
      (error)=> {

        console.log("Une erreur est survenue");
        
      }
    )
  
}
}
