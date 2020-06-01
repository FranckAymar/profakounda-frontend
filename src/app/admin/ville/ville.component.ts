import { Component, OnInit } from '@angular/core';
import { VilleService } from '../services/ville.service';
import { Ville } from '../model/ville.model';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  ville:Ville = new Ville(0,'',0,0);
  error:string;
  villes: any = [];
  constructor(private villeService:VilleService) { }

  ngOnInit() {
    this.onFetchVilles();
  }
  initVille(){
    this.ville = new Ville(0,'',0,0);
      }
      upDateVille(ville){
        console.log(ville);
        this.ville = new Ville(ville.id,ville.designation,ville.longitude,ville.latitude);
          }
      onFetchVilles()
      {
        this.villeService.onFetchVilles()
        .subscribe(
          (response)=>{
            this.villes = response;
          },
          (error)=>{
            console.log("Une erreur s'est produite: "+error);
          }
        )
      }
      onSaveVille(){
        if(this.ville.id != 0)
        {
          this.villeService.modifierVille(this.ville).subscribe(
            (reponse)=>{
              this.ville = new Ville(0,'',0,0);
              this.onFetchVilles();
              document.getElementById('ajouterVille').click();
            },
            (error)=>{
              console.log("Echec de modification de la ville: "+error);
            }
          )
        }else
        {
          this.villeService.enregistrerVille(this.ville).subscribe(
            (reponse)=>{
              this.error = reponse['error'];
              this.ville = new Ville(0,'',0,0);
              this.onFetchVilles();
              document.getElementById('ajouterVille').click();
            },
            (error)=>{
              console.log("Echec d'enregistrement du jour: "+error);
            }
          )
        }
      }
    
      supprimerVille(id){
        this.villeService.supprimerVille(id).subscribe(
          (response)=>{
            this.error = response['error'];
            this.onFetchVilles();
          },
          (error)=>{
            console.log("Error de suppression: "+error);
          }
        )
      }
    
    
    }


