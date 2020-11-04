import { Component, OnInit, ViewChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { URL } from 'src/app/API_url/config';
import { EMPTY } from 'rxjs';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { ParticulierService } from 'src/app/customers/services/particulier.service';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/home/services/sign-in.service';
import { consts } from '../../API_url/const'
import { FiliereService } from 'src/app/admin/services/filiere.service';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { PasswordModel } from '../models/PasswordModel';
import { Observable } from 'rxjs';
import { startWith, map,expand } from 'rxjs/operators';
import { VilleService } from 'src/app/admin/services/ville.service';
import { CompressorService } from '../services/CompressorService';
import { CommuneService } from 'src/app/admin/services/commune.service';
import { SnackbarService } from 'src/app/shared-component/services/snackbar.service';
import { MatDialog } from '@angular/material';
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
   @Input() commune:string;
   @Input() ville:string;
   modificationSuccessMessage:string;
   message:string;
   error:string;
   mes:string;
   urlFile;
   isVille:boolean = true;
   urlServer = URL.getPhoto;
  @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
  filieres=[] ;
  communes: any=[] ;
  niveaux = [];
  villes : any = [];
  villesObject:any = [];
  data: FileList;
  compressedImages = [];
  passwordModel:PasswordModel;
  userForm : FormGroup;
  passwordForm : FormGroup;
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControlCommune = new FormControl();
  filteredOptionsCommunes: Observable<string[]>
  filteredOptions3: Observable<string[]>
  filteredOptions2: Observable<string[]>
  filteredOptions: Observable<string[]>;
  @ViewChild('firstDialog',null) firstDialog: TemplateRef<any>;
  @ViewChild('secondDialog',null) secondDialog: TemplateRef<any>;
  constructor(private filiereService :FiliereService,
              private niveauService:NiveauService,
              private particulierService:ParticulierService,
              private villeService:VilleService,
              private communeService:CommuneService,
              private router:Router,
              private dialog: MatDialog,
              private snackbarService : SnackbarService,
              private formBuilder:FormBuilder,
              private signInService:SignInService,
              private compressor: CompressorService) { }

  ngOnInit() {
    this.init();
    this.rechercherPaticulierConnecter();
    this.onFetchNiveaux();
    this.onFetchFiliere();
    this.onFetchVilles();
    this.initPassword();
    // this.onFetchCommunes();
    this.onFetchVillesObject();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptionsCommunes = this.myControlCommune.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCommune(value))
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

    return this.villesObject.filter(option => option.designation.toLowerCase().includes(filterValue));
  }
  private _filterCommune(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.communes.filter(option => option.libelle.toLowerCase().includes(filterValue));
  }

 
///Compress File

recursiveCompress = (image: File, index, array) => {
  return this.compressor.compress(image).pipe (
    map(response => {

    //Code block after completing each compression
     // console.log('compressed ' + index + image.name);
      this.compressedImages.push(response);
      return {
        data: response,
        index: index + 1,
        array: array,
      };
    }),
  );
}

//En compresseFile
init(){
  this.userForm = this.formBuilder.group({
    nom:['',Validators.required],
    prenoms:['',Validators.required],
    telephone:'',
    lieuHabitation:'',
    filiere:'',
    niveau:'',
    ville:['',Validators.required],
    commune:['',Validators.required],
    username:localStorage.getItem(this.signInService.USERNAME)
  })
}
initPassword(){
  this.passwordForm = this.formBuilder.group({
    lastPassword:['',Validators.required],
    password:['',Validators.required],
    passwordConfirm:['',Validators.required],
    username:localStorage.getItem(this.signInService.USERNAME)
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
    this.particulierService.rechercherParticulier(localStorage.getItem(this.signInService.USERNAME))
    .subscribe(
      (reponse)=>{
        this.niveau = reponse['niveau'];
        this.filiere = reponse['filiere'];
        this.ville = reponse['ville'];
       this.id = reponse['id'];
       this.url = consts.host+ consts.nameProject+"photoParticulier/"+this.id;
       this.urlFile = this.urlServer +"/" + this.id ;
        this.userForm.patchValue({
          nom: reponse['nom'],
          prenoms: reponse['prenoms'],
          telephone: reponse['telephone'],
          lieuHabitation: reponse['lieuHabitation'],
          filiere: reponse['filiere'],
          niveau: reponse['niveau'],
          ville: reponse['ville'],
          commune: reponse['commune']
        
        })
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

  onFileChange(event) {
    
    if(event.target.files.length > 0) {
      this.data = event.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
  
        //Apercu
        reader.onload = (event) => {
          this.urlFile = reader.result ;
        }
       // console.log('input: '  + this.data[0].size);
        const compress = this.recursiveCompress( this.data[0], 0, this.data ).pipe(
          expand(res => {
            return res.index > res.array.length - 1
              ? EMPTY
              : this.recursiveCompress( this.data[res.index], res.index, this.data );
          }),
        );
        compress.subscribe(res => {
          if (res.index > res.array.length - 1) {
          //Code block after completing all compression
           // console.log('Compression successful ' + this.compressedImages);
            let file = this.compressedImages[0];

            let input = new FormData();
            if(this.data[0].size>512000)
            {
              input.append('photo',file);
            }
            else
            {
              input.append('photo',this.data[0]);
            }
            input.append('username',localStorage.getItem(this.signInService.USERNAME));
            this.uploadFile(input);
           
          }
        });
            }
  }

  uploadFile(data:FormData){
    this.particulierService.modifierPhoto(data).
    subscribe(
      (response)=>{
        this.modificationSuccessMessage ="Photo modifiée avec succès";
        //this.snackbarService.openSnackBar("Photo modifiée avec succès");
        //alert("Photo modifier avec succès.");
        this.dialog.open(this.firstDialog);
         
      },
      (error)=>{
        console.log("Erreur de modification de la photo.");
      }
    )
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
  onFetchCommunes() {
    this.communeService.listCommunes().subscribe(
      (response)=> {
        this.communes = response;
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
  onFetchVillesObject() {
    this.villeService.onFetchVilles().subscribe(
      (response)=> {
        this.villesObject = response;
       // console.log(response);
      },
      (error)=> {
        console.log("Une erreur est survenue");
      }

    )

  }
  changePassword(){
    let token = btoa( localStorage.getItem(this.signInService.USERNAME) + ':' + this.passwordForm.value['lastPassword']);
    let sesToken = localStorage.getItem(this.signInService.TOKEN);
    if(token === sesToken)
    {
      let newToken = btoa( localStorage.getItem(this.signInService.USERNAME) + ':' + this.passwordForm.value['password']);
      this.passwordModel = new PasswordModel(this.passwordForm.value['lastPassword'],this.passwordForm.value['password'],this.passwordForm.value['passwordConfirm'],localStorage.getItem(this.signInService.USERNAME));
      this.particulierService.onChangePassword(this.passwordModel)
    .subscribe(
      (response)=>{
        this.dialog.open(this.secondDialog);
        //alert("Modification effectuée avec succès.");
        this.initPassword();
        localStorage.setItem(this.signInService.TOKEN,newToken);
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
      
    }
  }
  
  mouseup(){
    if(this.myControl2.value==="" || this.myControl2.value===undefined)
    {
      this.myControlCommune.value == "";
      this.commune =""
      this.isVille = false;
    }
    else{
      this.isVille =true;
    }
    
  }
  
  mousedown(){
    
    this.communeService.listCommunesParVille(this.ville).subscribe(
      (resp)=>{
        
        this.communes = resp;
      },
      (error)=>{
       
        
        this.communes = [];
      }
    )
    
  }
  onUpdateParticulier(){
   
    this.particulierService.modifierParticulier(this.userForm.value)
    .subscribe(
      (response)=>{
        this.error = response["error"]
        if(!this.error)
        {
          this.modificationSuccessMessage ="Modification effectuée avec succès";
          this.dialog.open(this.secondDialog);
          //alert("Modification effectuée avec succès."); 
        this.rechercherPaticulierConnecter();
      
        //Rechargementt du component courant
        this.router.navigateByUrl('customers', { skipLocationChange: true }).then(() => {
          this.router.navigate(['customers/editprofil']);
      }); 
        // window.location.reload(false);
        this.clearFile();
        }
        
       
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
