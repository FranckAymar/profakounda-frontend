import { consts } from './const';

//Objet contenant les URLs
export const URL = {
    // Cette classe contiendra les différents URLs des services fournis oar le serveur

    //URL pour les classes
    recupererClasse : consts.host+ consts.nameProject +'recupererClasse'    ,

    //Recuperer Filiere
    recupererFiliere :  consts.host+ consts.nameProject +'filieres'   ,
    
    //RecupererCycle
    recupererCycle : consts.host+ consts.nameProject +'cycles'   ,
    enregistrerCycle:consts.host+ consts.nameProject +'enregistrerCycle',
    supprimerCycle:consts.host+ consts.nameProject +'deleteCycle',
    retrouverCycleParId:consts.host+ consts.nameProject +'getCycle',
    modifierCycle:consts.host+ consts.nameProject +'updateCycle'
}