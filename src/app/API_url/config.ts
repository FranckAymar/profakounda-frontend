import { consts } from './const';

//Objet contenant les URLs
export const URL = {
    // Cette classe contiendra les différents URLs des services fournis oar le serveur

    //URL pour les classes
    recupererClasse : consts.host+ consts.nameProject +'recupererClasse' ,
    enregistrerClasse : consts.host+ consts.nameProject +'enregistrerClasse'   ,
    supprimerClasse : consts.host+ consts.nameProject +'supprimerClasse' ,
    modifierClassse :  consts.host+ consts.nameProject +'modifierClasse' ,
    
    //Recuperer Filiere
    recupererFiliere :  consts.host+consts.nameProject+'filieres'
    enregistrerFiliere : consts.host+ consts.nameProject +'enregistrerFiliere'   ,
    supprimerFiliere : consts.host+ consts.nameProject +'supprimerClasse' ,
    modifierFiliere :  consts.host+ consts.nameProject +'modifierClasse' ,
       ,
    
    //RecupererCycle
    recupererCycle : consts.host+ consts.nameProject +'cycles'   

}