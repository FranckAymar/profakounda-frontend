import { consts } from './const';

//Objet contenant les URLs
export const URL = {
    // Cette classe contiendra les différents URLs des services fournis oar le serveur

    //URL pour les classes


    recupererClasse : consts.host+ consts.nameProject +'recupererClasse' ,
    enregistrerClasse : consts.host+ consts.nameProject +'admin/enregistrerClasse'   ,
    supprimerClasse : consts.host+ consts.nameProject +'admin/supprimerClasse' ,
    modifierClassse :  consts.host+ consts.nameProject +'admin/modifierClasse' ,
    //URL des Filieres
    recupererFiliere :  consts.host+consts.nameProject+'filieres' ,
    enregistrerFiliere : consts.host+ consts.nameProject +'admin/enregistrerFiliere',
    modifierFiliere:  consts.host+ consts.nameProject +'admin/modifierFiliere' ,
    supprimerFiliere:  consts.host+ consts.nameProject +'admin/supprimerFiliere' ,
    
    //Cycle
    recupererCycle : consts.host+ consts.nameProject +'cycles'   ,
    enregistrerCycle:consts.host+ consts.nameProject +'admin/enregistrerCycle',
    supprimerCycle:consts.host+ consts.nameProject +'admin/deleteCycle',
    retrouverCycleParId:consts.host+ consts.nameProject +'admin/getCycle',
    modifierCycle:consts.host+ consts.nameProject +'admin/updateCycle',

    //Forfait
    recupererForfaits : consts.host+ consts.nameProject +'recupererForfait',
    enregistrerForfait : consts.host+ consts.nameProject +'admin/enregistrerForfait' ,
    supprimerForfait : consts.host+ consts.nameProject +'admin/supprimerForfait',
    modifierForfait :  consts.host+ consts.nameProject +'admin/modifierForfait',
    //Niveau
    recupererNiveau : consts.host+ consts.nameProject +'niveaux'   ,
    enregistrerNiveau:consts.host+ consts.nameProject +'admin/enregistrerNiveau',
    supprimerNiveau:consts.host+ consts.nameProject +'admin/deleteNiveau',
    retrouverNiveauParId:consts.host+ consts.nameProject +'admin/getNiveau',
    modifierNiveau:consts.host+ consts.nameProject +'admin/updateNiveau',
    //Particulier
    enregistrerParticulier : consts.host+ consts.nameProject +'enregistrerParticulier',
    modifierParticulier : consts.host+ consts.nameProject +'particulier/modifierParticulier',
    rechercherParticulier : consts.host+ consts.nameProject +'rechercherParticulierParUsername',
    getPhoto : consts.host+ consts.nameProject +'photoParticulier',
    //SIGN IN
    login : consts.host+ consts.nameProject +'login',
    recupererInformationsCompte : consts.host+ consts.nameProject +'compte'
}
