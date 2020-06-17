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
    recupererVilles :  consts.host+consts.nameProject+'villes' ,
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
    modifierPhoto: consts.host+ consts.nameProject +'particulier/uploadPhoto',
    rechercherParticulier : consts.host+ consts.nameProject +'rechercherParticulierParUsername',
    verifierVilleParticulier : consts.host+ consts.nameProject +'particulier/rechercherVilleParParticulier',
    getCode : consts.host+ consts.nameProject +'rechercherCodeParticulier',
    reSendEmail : consts.host+ consts.nameProject +'renvoyerMail',
    getPhoto : consts.host+ consts.nameProject +'photoParticulier',
    getParticuliers : consts.host+ consts.nameProject +'admin/particuliers',
    renvoieMail : consts.host+ consts.nameProject +'particulier/renvoieMail',
    //SIGN IN
    login : consts.host+ consts.nameProject +'login',
    verifier : consts.host+ consts.nameProject +'verifier',

    //sign up
    singUpValidation:consts.host+ consts.nameProject+'sinUp-validation',
    //Avis
    enregistrerAvis:consts.host+ consts.nameProject+'particulier/enregistrerAvis',
    modifierAvis:consts.host+ consts.nameProject+'particulier/modifierAvis',
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
    addAllModule: consts.host+ consts.nameProject +'particulier/addAllModule',
    addAllNiveaux: consts.host+ consts.nameProject +'particulier/enregistrerContratAllNiveaux',
    getModule: consts.host+ consts.nameProject +'particulier/getModule',
    allNiveauVerification: consts.host+ consts.nameProject +'particulier/getAllNiveau',
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
    demandeMiseHorsLigne: consts.host+ consts.nameProject +'particulier/mettrehorsligne',
    demandeMiseEnLigneObject: consts.host+ consts.nameProject +'particulier/demandemiseenligneObject',
    //DASHBOARD PARTICULIER
    getDashBoardProposition: consts.host+ consts.nameProject +'particulier/dashboard/propositions',
    getDashBoardCoursCommun: consts.host+ consts.nameProject +'particulier/dashboard/coursCommuns',
    getDashBoardInscritsCoursCommuns:consts.host+ consts.nameProject +'particulier/dashboard/inscrits',
    getStatistiquesInscrits:consts.host+ consts.nameProject +'particulier/dashboard/statistiques',
    
   
    //Détails formations
    listPropositionFormationsEnligne : consts.host+ consts.nameProject +'details/listpropositionsenligne',
    detailsPropositionFormation : consts.host+ consts.nameProject +'details/propositionformation',
    FilterPropositionFormation : consts.host+ consts.nameProject +'details/filterDeFormation',
    filterDeFormationParVille : consts.host+ consts.nameProject +'details/filterDeFormationParVille',
    filterDeFormationParEssai : consts.host+ consts.nameProject +'details/filterDeFormationParEssai',
    rechercherPropositionEnLigneHome : consts.host+ consts.nameProject +'details/home/listpropositionsenligne',

    getContactParticulier : consts.host+ consts.nameProject  + 'details/particulier/contactparticulier', 

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
    getPaymentActifDashboard : consts.host+ consts.nameProject + 'particulier/dashboard/paiementsparticulier',
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
    recupererDashBoard : consts.host+ consts.nameProject + 'admin/dashboard',

    //Favoris
    ajouterFavoris :  consts.host+ consts.nameProject + 'particulier/enregistrerfavoris',
    supprimerFavoris :  consts.host+ consts.nameProject + 'particulier/supprimerfavorisparticulier',
    recupererFavoris : consts.host+ consts.nameProject + 'particulier/favorisparticulier',


    //COurs commun 
    enregistrerCoursCommun : consts.host+ consts.nameProject + 'particulier/enregistrercourscommun',
    modifierCoursCommun : consts.host+ consts.nameProject + 'particulier/modifiercourscommun',
    enregistrerPublicCible : consts.host+ consts.nameProject + 'particulier/enregistrerpublicvise',
    modifierPublicCible : consts.host+ consts.nameProject + 'particulier/modifierpublicvise',
    enregisterLieuIntervention : consts.host+ consts.nameProject + 'particulier/enregistrerlieuintervention',
    modifierLieuIntervention : consts.host+ consts.nameProject + 'particulier/modifierlieuintervention',
    recupererCoursCommun : consts.host+ consts.nameProject + 'organisation/coursCommuns',
    recupererCoursCommunHome : consts.host+ consts.nameProject + 'home/coursCommuns',
    recupererListCoursCommunHome : consts.host+ consts.nameProject + 'home/list/coursCommuns',
    modifierCoutGeneral : consts.host+ consts.nameProject + 'particulier/modifiercoutgeneral',
    demandeMiseEnligneCourCommun : consts.host+ consts.nameProject + 'particulier/demandeMiseEnligneCourCommun',
    demandeVersement : consts.host+ consts.nameProject + 'particulier/demandeVirement',
    demandeVersementAdmin : consts.host+ consts.nameProject + 'admin/demandeVirements',
    nombreDemandeVirement : consts.host+ consts.nameProject + 'admin/nombreDemandeVirement',
    recupererCoursCommunsInscritsParticulier : consts.host+ consts.nameProject + 'particulier/coursCommunsSelects',
    coursCommunsParCode : consts.host+ consts.nameProject + '/home/coursCommunsParCode',
    fermerInscriptionCoursCommun : consts.host+ consts.nameProject + 'particulier/fermerinscriptioncourscommun',
    fermerInscriptionPublicCible : consts.host+ consts.nameProject + 'particulier/fermerinscriptionpubliccible',
    coursCommunsParOrganisation : consts.host+ consts.nameProject + '/home/coursCommunsParOrganisation',
    modifierLogoCoursCommun : consts.host+ consts.nameProject + 'particulier/uploadLogo',
    getLogoCoursCommun : consts.host+ consts.nameProject + 'logoCoursCommun',
    //cours Commun admin
    listeCoursCommuns : consts.host+ consts.nameProject + 'admin/coursCommuns',
    comptabiliteCoursCommun : consts.host+ consts.nameProject + 'admin/comptabilite',
    comptabiliteParOrganisation : consts.host+ consts.nameProject + 'admin/comptabiliteParOrganistion',
    accepterMiseEnligneCourCommun : consts.host+ consts.nameProject + 'admin/accepterMiseEnligneCourCommun',
    refuserMiseEnLigneCourCommun : consts.host+ consts.nameProject + 'admin/refuserMiseEnLigneCourCommun',
    supprimerMiseEnligneCourCommun : consts.host+ consts.nameProject + 'admin/supprimerMiseEnligneCourCommun',
    allCoursCommunAdmin : consts.host+ consts.nameProject + 'admin/AllCoursCommun',
    recupererCoursCommunParId : consts.host+ consts.nameProject + 'particulier/detailCoursCommun',
    recupererCoursCommunForHomeParId : consts.host+ consts.nameProject + 'detailCoursCommun',

    detailsCoursCommunAdmin : consts.host+ consts.nameProject + 'admin/detailsCoursCommun',
    //Organisation
    recupererOrganisation : consts.host+ consts.nameProject + 'organisations',

    //InscriptionCoursCommun
    inscritptionCoursOrganise :  consts.host+ consts.nameProject +  'particulier/paiementinscription',
    inscriptioncourscommun : consts.host+ consts.nameProject + 'particulier/inscriptioncourscommun',
    inscriptionpubliccible : consts.host+ consts.nameProject + 'particulier/inscriptionpubliccible',
    recupererInscrit :  consts.host+ consts.nameProject + 'recupererinscrits',
    verifiedLastInscription :  consts.host+ consts.nameProject + 'particulier/verifiedLastInscription'
}