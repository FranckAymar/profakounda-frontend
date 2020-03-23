import { consts } from './const';

//Objet contenant les URLs
export const URL = {
    // Cette classe contiendra les différents URLs des services fournis oar le serveur

    //URL pour les classes


    recupererClasse : consts.host+ consts.nameProject +'recupererClasse' ,
    enregistrerClasse : consts.host+ consts.nameProject +'enregistrerClasse'   ,
    supprimerClasse : consts.host+ consts.nameProject +'supprimerClasse' ,
    modifierClassse :  consts.host+ consts.nameProject +'modifierClasse' ,
    //URL des Filieres
    recupererFiliere :  consts.host+consts.nameProject+'filieres' ,
    enregistrerFiliere : consts.host+ consts.nameProject +'enregistrerFiliere',
    modifierFiliere:  consts.host+ consts.nameProject +'modifierFiliere' ,
    supprimerFiliere:  consts.host+ consts.nameProject +'supprimerFiliere' ,
    
    //Cycle
    recupererCycle : consts.host+ consts.nameProject +'cycles'   ,
    enregistrerCycle:consts.host+ consts.nameProject +'enregistrerCycle',
    supprimerCycle:consts.host+ consts.nameProject +'deleteCycle',
    retrouverCycleParId:consts.host+ consts.nameProject +'getCycle',
    modifierCycle:consts.host+ consts.nameProject +'updateCycle',

    //Forfait
    recupererForfaits : consts.host+ consts.nameProject +'recupererForfait',
    enregistrerForfait : consts.host+ consts.nameProject +'enregistrerForfait' ,
    supprimerForfait : consts.host+ consts.nameProject +'supprimerForfait',
    modifierForfait :  consts.host+ consts.nameProject +'modifierForfait',
    //Niveau
    recupererNiveau : consts.host+ consts.nameProject +'niveaux'   ,
    enregistrerNiveau:consts.host+ consts.nameProject +'enregistrerNiveau',
    supprimerNiveau:consts.host+ consts.nameProject +'deleteNiveau',
    retrouverNiveauParId:consts.host+ consts.nameProject +'getNiveau',
    modifierNiveau:consts.host+ consts.nameProject +'updateNiveau'
}