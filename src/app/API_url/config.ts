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
    
    //RecupererCycle
    recupererCycle : consts.host+ consts.nameProject +'cycles'   

} 