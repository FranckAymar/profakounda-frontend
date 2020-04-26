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
    onFetchFiliereString :  consts.host+consts.nameProject+'filieresString' ,
    enregistrerFiliere : consts.host+ consts.nameProject +'admin/enregistrerFiliere',
    modifierFiliere:  consts.host+ consts.nameProject +'admin/modifierFiliere' ,
    supprimerFiliere:  consts.host+ consts.nameProject +'admin/supprimerFiliere' ,
    //URL Villes
    recupererVilles :  consts.host+consts.nameProject+'admin/villes' ,
    onFetchVillesString :  consts.host+consts.nameProject+'villesString' ,
    enregistrerVille : consts.host+ consts.nameProject +'admin/enregistrerVille',
    modifierVille:  consts.host+ consts.nameProject +'admin/modifierVille' ,
    supprimerVille:  consts.host+ consts.nameProject +'admin/supprimerVille' ,
    
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
    onFetchNiveauString : consts.host+ consts.nameProject +'niveauxString' ,
    enregistrerNiveau:consts.host+ consts.nameProject +'admin/enregistrerNiveau',
    supprimerNiveau:consts.host+ consts.nameProject +'admin/deleteNiveau',
    retrouverNiveauParId:consts.host+ consts.nameProject +'admin/getNiveau',
    modifierNiveau:consts.host+ consts.nameProject +'admin/updateNiveau',
    //Particulier
    enregistrerParticulier : consts.host+ consts.nameProject +'enregistrerParticulier',
    modifierParticulier : consts.host+ consts.nameProject +'particulier/modifierParticulier',
    rechercherParticulier : consts.host+ consts.nameProject +'rechercherParticulierParUsername',
    getPhoto : consts.host+ consts.nameProject +'photoParticulier',
    getParticuliers : consts.host+ consts.nameProject +'admin/particuliers',
    //SIGN IN
    login : consts.host+ consts.nameProject +'login',

    //sign up
    singUpValidation:consts.host+ consts.nameProject+'sinUp-validation',
    //Change password
    changePassword:consts.host+ consts.nameProject+'particulier/changePassword',

    //Reset password
    forgotPassword : consts.host+ consts.nameProject +'forgot-password' ,
    resetPassword : consts.host+ consts.nameProject +'reset-password' ,
    
    // Proposition de formation liens
    enregsitrerNiveauForme: consts.host+ consts.nameProject +'particulier/enregistrerContrat' ,
    modifierNiveauForme: consts.host+ consts.nameProject +'particulier/modifierContrat' ,
    enregistrerModule: consts.host+ consts.nameProject +'particulier/enregistrerModule' ,
    rechercherModule: consts.host+ consts.nameProject +'particulier/modules' ,
    rechercherNiveauEnseignes: consts.host+ consts.nameProject +'particulier/contrats' ,
    getContrat: consts.host+ consts.nameProject +'particulier/getContrat',
    getProposition: consts.host+ consts.nameProject +'particulier/getProposition',
    getModule: consts.host+ consts.nameProject +'particulier/getModule',
    deleteContrat: consts.host+ consts.nameProject +'particulier/deleteContrat',
    deleteModule: consts.host+ consts.nameProject +'particulier/deleteModule',
    modifierModule: consts.host+ consts.nameProject +'particulier/modifierModule' ,
    rechercherDisponibilites: consts.host+ consts.nameProject +'particulier/recupererdisponibilites' ,
    enregistrerDisponibilte: consts.host+ consts.nameProject +'particulier/enregistrerdisponibilite' ,
    enregistrerCoordMap : consts.host+ consts.nameProject +'particulier/enregistrerzoneintervention',
    enregistrerListJourHeure: consts.host+ consts.nameProject +'particulier/enregistrerListJourHeure' ,
    rechercherPropositions: consts.host+ consts.nameProject +'particulier/propositions' ,
    enregsitrerProposition: consts.host+ consts.nameProject +'particulier/enregistrerProposition' ,
    modifierProposition: consts.host+ consts.nameProject +'particulier/modifierProposition' ,
    deleteDisponibiliteByDay: consts.host+ consts.nameProject +'particulier/deleteDisponibiliteByDayId',
    deleteDisponibiliteByHour: consts.host+ consts.nameProject +'particulier/deleteDisponibiliteByHourId',
    demandeMiseEnLigne: consts.host+ consts.nameProject +'particulier/demandemiseenligne',
    
    
   
    //Détails formations
    listPropositionFormationsEnligne : consts.host+ consts.nameProject +'details/listpropositionsenligne',
    detailsPropositionFormation : consts.host+ consts.nameProject +'details/propositionformation',
    FilterPropositionFormation : consts.host+ consts.nameProject +'details/fiterDeFormation',
    getContactParticulier : consts.host+ consts.nameProject  + 'details/particulier/contactparticulier',
    Formationfiltre : consts.host+ consts.nameProject  + 'details/formationFiltre',
    

    //JOUR
    enregistrerJour : consts.host+ consts.nameProject +'enregistrerJour',
    modifierJour : consts.host+ consts.nameProject +'modifierJour',
    supprimerJour : consts.host+ consts.nameProject +'supprimerJour',
    rechercherJour : consts.host+ consts.nameProject +'getJour',
    onFetchJours : consts.host+ consts.nameProject +'jours',
    onFetchJoursString : consts.host+ consts.nameProject +'tabStringJours',
    //FORMATIONS
    enregistrerFormation : consts.host+ consts.nameProject +'enregistrerFormation',
    modifierFormation : consts.host+ consts.nameProject +'modifierFormation',
    onFetchFormations : consts.host+ consts.nameProject +'formations',
    onFetchFormationsString : consts.host+ consts.nameProject +'formationsString',
    supprimerFormation : consts.host+ consts.nameProject +'supprimerFormation',
  
    //Paiement
    processToPayment : consts.host+ consts.nameProject + 'particulier/enregistrerpaiement',
    getPaymentParticulier : consts.host+ consts.nameProject + 'particulier/paiementsparticulier',
    getPayments : consts.host+ consts.nameProject + 'admin/paiements',

    //ParticulierProposition
    getAllPparticulierPropositions : consts.host+ consts.nameProject + 'admin/particulierspropostions',


    //CauseRefus
    ajouterRefus : consts.host+ consts.nameProject + 'admin/enregistercause',
    recupererRefus : consts.host+ consts.nameProject + 'causerefus',


    //Administration propostion de formation
    recupererAllPropostionFormation :  consts.host+ consts.nameProject + 'admin/propositions',
    mettreEnLigne : consts.host+ consts.nameProject +'admin/acceptermiseenligne',
    refuserMiseEnLigne : consts.host+ consts.nameProject +'admin/refusermiseenligne',
    supprimerMiseEnligne : consts.host+ consts.nameProject +'admin/supprimerMiseEnligne',

    //Dashboard
    recupererDashBoard : consts.host+ consts.nameProject + 'admin/dashboard'

}
