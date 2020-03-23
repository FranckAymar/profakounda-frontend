import { Component, OnInit } from '@angular/core';
import { NiveauService } from 'src/app/admin/services/niveau.service';
import { Niveau } from 'src/app/model/niveau.model';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {

  niveaux : [];
  erreur :string;
  niveau1:Niveau = new Niveau(0,"");
  niveau:Niveau = new Niveau(0,"");
  constructor(private niveauService:NiveauService) { }

  ngOnInit() {
    this.onFetchNiveaux();
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

  onSaveNiveau(formData){
    this.niveauService.onSaveNiveau(formData)
    .subscribe(
      (response)=>{
        this.niveau = new Niveau(0,"");
        document.getElementById('ajouterNiveau').click();
        this.onFetchNiveaux();
      },
      (error)=>{
        console.log('Une erreure à survenue: '+ error);
      }
    )
  }

  onUpdateNiveau(formData){
    console.log(formData);
    this.niveauService.updateNiveau(formData)
    .subscribe(
      (response)=>{
        this.niveau1 = new Niveau(0,"");
        document.getElementById('updateNiveau').click();
        this.onFetchNiveaux();
      },
      (error)=>{
        console.log("Une erreur s'est produite: "+error);
      }
    )
  }

  deleteNiveau(id:number){
    const niv = new Niveau(id,"");
    this.niveauService.onDeleteNiveau(niv)
    .subscribe(
      (reponse)=>{
        this.erreur = reponse['error'];
        this.onFetchNiveaux();
      },
      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }


  getNiveau(id:number){
    const niveau = new Niveau(id,"");
    this.niveauService.getNiveau(niveau)
    .subscribe(
      (reponse)=>{
       this.niveau1.id = reponse["id"];
       this.niveau1.libelle = reponse["libelle"]
      },
      (erreur)=>{
        console.log("Une erreur s'est produite: "+erreur);
      }
    )
  }

}
