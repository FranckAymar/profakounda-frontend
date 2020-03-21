import { consts } from './const';

//Objet contenant les URLs
export const URL = {
    // Cette classe contiendra les différents URLs des services fournis oar le serveur

    //URL pour les classes
    recupererClasse : consts.host+consts.nameProject +'recupererClasse'    ,

    //Recuperer Filiere
    recupererFiliere :  consts.host+consts.nameProject+'filieres'   ,
    
    //RecupererCycle
    recupererCycle : consts.host+ consts.nameProject +'cycles'   

}