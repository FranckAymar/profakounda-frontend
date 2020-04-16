import { Component, OnInit } from '@angular/core';
import { FormationService } from '../services/formation.service';
import { FormationModel } from '../model/FormationModel';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
error:string;
  formations:any = [];
  formation:FormationModel = new FormationModel(0,'');
  constructor(private formationService:FormationService) { }

  ngOnInit() {
    this.onFetchFormations()
  }

  initFormation(){
    this.formation = new FormationModel(0,'');
      }
      upDateFormation(formation){
        this.formation = new FormationModel(formation.id,formation.libelle);
          }
      onFetchFormations()
      {
       this.formationService.onFetchFormations().subscribe(
         (response)=>{
           this.formations = response;
         },
         (error)=>{
           console.log("Erreur de recuperation des formations: "+error);
         }
       )
      }
    
      onSaveFormation(){
        if(this.formation.id != 0)
        {
          this.formationService.modifierFormation(this.formation).subscribe(
            (reponse)=>{
              this.formation = new FormationModel(0,'');
              this.onFetchFormations()
              document.getElementById('ajouterFormation').click();
            },
            (error)=>{
              console.log("Echec de modification de la Formation: "+error);
            }
          )
        }else
        {
          this.formationService.enregistrerFormation(this.formation).subscribe(
            (reponse)=>{
              this.formation = new FormationModel(0,'');
              this.onFetchFormations();
              document.getElementById('ajouterFormation').click();
            },
            (error)=>{
              console.log("Echec d'enregistrement de la formation: "+error);
            }
          )
        }
      }
    
      supprimerFormation(id){
        this.formationService.supprimerFormation(id).subscribe(
          (response)=>{
            this.error = response['error'];
            this.onFetchFormations()
          },
          (error)=>{
            console.log("Error de suppression: "+error);
          }
        )
      }
    

}
