import { environment } from 'src/environments/environment';

//Objet contenant les URLs
export const URL = {
    // Cette classe contiendra les différents URLs des services fournis oar le serveur

    //URL pour les classes


    recupererClasse : environment.host+ environment.nameProject +'recupererClasse' ,
    enregistrerClasse : environment.host+ environment.nameProject +'admin/enregistrerClasse'   ,
    supprimerClasse : environment.host+ environment.nameProject +'admin/supprimerClasse' ,
    modifierClassse :  environment.host+ environment.nameProject +'admin/modifierClasse' ,
    //URL des Filieres
    recupererFiliere :  environment.host+environment.nameProject+'filieres' ,
    onFetchFiliereString :  environment.host+environment.nameProject+'filieresString' ,
    enregistrerFiliere : environment.host+ environment.nameProject +'admin/enregistrerFiliere',
    modifierFiliere:  environment.host+ environment.nameProject +'admin/modifierFiliere' ,
    supprimerFiliere:  environment.host+ environment.nameProject +'admin/supprimerFiliere' ,
    //URL Villes
    recupererVilles :  environment.host+environment.nameProject+'villes' ,
    onFetchVillesString :  environment.host+environment.nameProject+'villesString' ,
    enregistrerVille : environment.host+ environment.nameProject +'admin/enregistrerVille',
    modifierVille:  environment.host+ environment.nameProject +'admin/modifierVille' ,
    supprimerVille:  environment.host+ environment.nameProject +'admin/supprimerVille' ,
    
    //Cycle
    recupererCycle : environment.host+ environment.nameProject +'cycles'   ,
    enregistrerCycle:environment.host+ environment.nameProject +'admin/enregistrerCycle',
    supprimerCycle:environment.host+ environment.nameProject +'admin/deleteCycle',
    retrouverCycleParId:environment.host+ environment.nameProject +'admin/getCycle',
    modifierCycle:environment.host+ environment.nameProject +'admin/updateCycle',

    //Forfait
    recupererForfaits : environment.host+ environment.nameProject +'recupererForfait',
    enregistrerForfait : environment.host+ environment.nameProject +'admin/enregistrerForfait' ,
    supprimerForfait : environment.host+ environment.nameProject +'admin/supprimerForfait',
    modifierForfait :  environment.host+ environment.nameProject +'admin/modifierForfait',
    //Niveau
    recupererNiveau : environment.host+ environment.nameProject +'niveaux'   ,
    onFetchNiveauString : environment.host+ environment.nameProject +'niveauxString' ,
    enregistrerNiveau:environment.host+ environment.nameProject +'admin/enregistrerNiveau',
    supprimerNiveau:environment.host+ environment.nameProject +'admin/deleteNiveau',
    retrouverNiveauParId:environment.host+ environment.nameProject +'admin/getNiveau',
    modifierNiveau:environment.host+ environment.nameProject +'admin/updateNiveau',
    //Particulier
    enregistrerParticulier : environment.host+ environment.nameProject +'enregistrerParticulier',
    modifierParticulier : environment.host+ environment.nameProject +'particulier/modifierParticulier',
    modifierPhoto: environment.host+ environment.nameProject +'particulier/uploadPhoto',
    rechercherParticulier : environment.host+ environment.nameProject +'rechercherParticulierParUsername',
    verifierVilleParticulier : environment.host+ environment.nameProject +'particulier/rechercherVilleParParticulier',
    getCode : environment.host+ environment.nameProject +'rechercherCodeParticulier',
    reSendEmail : environment.host+ environment.nameProject +'renvoyerMail',
    getPhoto : environment.host+ environment.nameProject +'photoParticulier',
    getParticuliers : environment.host+ environment.nameProject +'admin/particuliers',
    renvoieMail : environment.host+ environment.nameProject +'particulier/renvoieMail',
    envoyerMessageCompte : environment.host+ environment.nameProject +'admin/envoyerMessageCompte',
    //COMMUNES
    listCommunes : environment.host+ environment.nameProject +'/communes',
    communeParVille : environment.host+ environment.nameProject +'/rechercherCommuneParVille',
    enregistrerCommune : environment.host+ environment.nameProject +'admin/enregistrerCommune',
    //SIGN IN
    login : environment.host+ environment.nameProject +'login',
    verifier : environment.host+ environment.nameProject +'verifier',

    //sign up
    singUpValidation:environment.host+ environment.nameProject+'sinUp-validation',
    //Avis
    enregistrerAvis:environment.host+ environment.nameProject+'particulier/enregistrerAvis',
    modifierAvis:environment.host+ environment.nameProject+'particulier/modifierAvis',
    //Change password
    changePassword:environment.host+ environment.nameProject+'particulier/changePassword',

    //Reset password
    forgotPassword : environment.host+ environment.nameProject +'forgot-password' ,
    resetPassword : environment.host+ environment.nameProject +'reset-password' ,
    
    // Proposition de formation liens
    enregsitrerNiveauForme: environment.host+ environment.nameProject +'particulier/enregistrerContrat' ,
    modifierNiveauForme: environment.host+ environment.nameProject +'particulier/modifierContrat' ,
    enregistrerModule: environment.host+ environment.nameProject +'particulier/enregistrerModule' ,
    rechercherModule: environment.host+ environment.nameProject +'particulier/modules' ,
    rechercherNiveauEnseignes: environment.host+ environment.nameProject +'particulier/contrats' ,
    getContrat: environment.host+ environment.nameProject +'particulier/getContrat',
    getProposition: environment.host+ environment.nameProject +'particulier/getProposition',
    addAllModule: environment.host+ environment.nameProject +'particulier/addAllModule',
    addAllNiveaux: environment.host+ environment.nameProject +'particulier/enregistrerContratAllNiveaux',
    getModule: environment.host+ environment.nameProject +'particulier/getModule',
    allNiveauVerification: environment.host+ environment.nameProject +'particulier/getAllNiveau',
    deleteContrat: environment.host+ environment.nameProject +'particulier/deleteContrat',
    deleteModule: environment.host+ environment.nameProject +'particulier/deleteModule',
    modifierModule: environment.host+ environment.nameProject +'particulier/modifierModule' ,
    rechercherDisponibilites: environment.host+ environment.nameProject +'particulier/recupererdisponibilites' ,
    enregistrerDisponibilte: environment.host+ environment.nameProject +'particulier/enregistrerdisponibilite' ,
    enregistrerCoordMap : environment.host+ environment.nameProject +'particulier/enregistrerzoneintervention',
    enregistrerListJourHeure: environment.host+ environment.nameProject +'particulier/enregistrerListJourHeure' ,
    rechercherPropositions: environment.host+ environment.nameProject +'particulier/propositions' ,
    enregsitrerProposition: environment.host+ environment.nameProject +'particulier/enregistrerProposition' ,
    modifierProposition: environment.host+ environment.nameProject +'particulier/modifierProposition' ,
    deleteDisponibiliteByDay: environment.host+ environment.nameProject +'particulier/deleteDisponibiliteByDayId',
    deleteDisponibiliteByHour: environment.host+ environment.nameProject +'particulier/deleteDisponibiliteByHourId',
    demandeMiseEnLigne: environment.host+ environment.nameProject +'particulier/demandemiseenligne',
    demandeMiseHorsLigne: environment.host+ environment.nameProject +'particulier/mettrehorsligne',
    demandeMiseEnLigneObject: environment.host+ environment.nameProject +'particulier/demandemiseenligneObject',
    envoyerMessageProposition : environment.host+ environment.nameProject +'admin/envoyerMessageProposition',
    //DASHBOARD PARTICULIER
    getDashBoardProposition: environment.host+ environment.nameProject +'particulier/dashboard/propositions',
    getDashBoardCoursCommun: environment.host+ environment.nameProject +'particulier/dashboard/coursCommuns',
    getDashBoardInscritsCoursCommuns:environment.host+ environment.nameProject +'particulier/dashboard/inscrits',
    getStatistiquesInscrits:environment.host+ environment.nameProject +'particulier/dashboard/statistiques',
    
   
    //Détails formations
    listPropositionFormationsEnligne : environment.host+ environment.nameProject +'details/listpropositionsenligne',
    detailsPropositionFormation : environment.host+ environment.nameProject +'details/propositionformation',
    FilterPropositionFormation : environment.host+ environment.nameProject +'details/filterDeFormation',
    filterDeFormationParVille : environment.host+ environment.nameProject +'details/filterDeFormationParVille',
    filterDeFormationParEssai : environment.host+ environment.nameProject +'details/filterDeFormationParEssai',
    rechercherPropositionEnLigneHome : environment.host+ environment.nameProject +'details/home/listpropositionsenligne',

    getContactParticulier : environment.host+ environment.nameProject  + 'details/particulier/contactparticulier', 

    //JOUR
    enregistrerJour : environment.host+ environment.nameProject +'enregistrerJour', 
    modifierJour : environment.host+ environment.nameProject +'modifierJour',
    supprimerJour : environment.host+ environment.nameProject +'supprimerJour',
    rechercherJour : environment.host+ environment.nameProject +'getJour',
    onFetchJours : environment.host+ environment.nameProject +'jours',
    onFetchJoursString : environment.host+ environment.nameProject +'tabStringJours',
    //FORMATIONS
    enregistrerFormation : environment.host+ environment.nameProject +'enregistrerFormation',
    modifierFormation : environment.host+ environment.nameProject +'modifierFormation',
    onFetchFormations : environment.host+ environment.nameProject +'formations',
    onFetchFormationsString : environment.host+ environment.nameProject +'formationsString',
    supprimerFormation : environment.host+ environment.nameProject +'supprimerFormation',
  
    //Paiement
    processToPayment : environment.host+ environment.nameProject + 'particulier/enregistrerpaiement',
    getPaymentParticulier : environment.host+ environment.nameProject + 'particulier/paiementsparticulier',
    getPaymentActifDashboard : environment.host+ environment.nameProject + 'particulier/dashboard/paiementsparticulier',
    getPayments : environment.host+ environment.nameProject + 'admin/paiements',

    //ParticulierProposition
    getAllPparticulierPropositions : environment.host+ environment.nameProject + 'admin/particulierspropostions',


    //CauseRefus
    ajouterRefus : environment.host+ environment.nameProject + 'admin/enregistercause',
    recupererRefus : environment.host+ environment.nameProject + 'causerefus',


    //Administration propostion de formation
    recupererAllPropostionFormation :  environment.host+ environment.nameProject + 'admin/propositions',
    mettreEnLigne : environment.host+ environment.nameProject +'admin/acceptermiseenligne',
    refuserMiseEnLigne : environment.host+ environment.nameProject +'admin/refusermiseenligne',
    supprimerMiseEnligne : environment.host+ environment.nameProject +'admin/supprimerMiseEnligne',

    //Dashboard
    recupererDashBoard : environment.host+ environment.nameProject + 'admin/dashboard',

    //Favoris
    ajouterFavoris :  environment.host+ environment.nameProject + 'particulier/enregistrerfavoris',
    supprimerFavoris :  environment.host+ environment.nameProject + 'particulier/supprimerfavorisparticulier',
    recupererFavoris : environment.host+ environment.nameProject + 'particulier/favorisparticulier',
    //COurs commun 
    enregistrerCoursCommun : environment.host+ environment.nameProject + 'particulier/enregistrercourscommun',
    modifierCoursCommun : environment.host+ environment.nameProject + 'particulier/modifiercourscommun',
    enregistrerPublicCible : environment.host+ environment.nameProject + 'particulier/enregistrerpublicvise',
    modifierPublicCible : environment.host+ environment.nameProject + 'particulier/modifierpublicvise',
    enregisterLieuIntervention : environment.host+ environment.nameProject + 'particulier/enregistrerlieuintervention',
    modifierLieuIntervention : environment.host+ environment.nameProject + 'particulier/modifierlieuintervention',
    recupererCoursCommun : environment.host+ environment.nameProject + 'organisation/coursCommuns',
    recupererCoursCommunHome : environment.host+ environment.nameProject + 'home/coursCommuns',
    recupererListCoursCommunHome : environment.host+ environment.nameProject + 'home/list/coursCommuns',
    modifierCoutGeneral : environment.host+ environment.nameProject + 'particulier/modifiercoutgeneral',
    demandeMiseEnligneCourCommun : environment.host+ environment.nameProject + 'particulier/demandeMiseEnligneCourCommun',
    demandeVersement : environment.host+ environment.nameProject + 'particulier/demandeVirement',
    accepterVirement : environment.host+ environment.nameProject + 'admin/validerVirement',
    demandeVersementAdmin : environment.host+ environment.nameProject + 'admin/demandeVirements',
    virements : environment.host+ environment.nameProject + 'admin/virements',
    nombreDemandeVirement : environment.host+ environment.nameProject + 'admin/nombreDemandeVirement',
    recupererCoursCommunsInscritsParticulier : environment.host+ environment.nameProject + 'particulier/coursCommunsSelects',
    coursCommunsParCode : environment.host+ environment.nameProject + '/home/coursCommunsParCode',
    fermerInscriptionCoursCommun : environment.host+ environment.nameProject + 'particulier/fermerinscriptioncourscommun',
    fermerInscriptionPublicCible : environment.host+ environment.nameProject + 'particulier/fermerinscriptionpubliccible',
    coursCommunsParOrganisation : environment.host+ environment.nameProject + '/home/coursCommunsParOrganisation',
    modifierLogoCoursCommun : environment.host+ environment.nameProject + 'particulier/uploadLogo',
    getLogoCoursCommun : environment.host+ environment.nameProject + 'logoCoursCommun',
    modifierAffichePubCoursCommun : environment.host+ environment.nameProject + 'particulier/uploadaffichepub',
    getAffichePubCoursCommun : environment.host+ environment.nameProject + 'afficheCoursCommun',
    
    //cours Commun admin
    listeCoursCommuns : environment.host+ environment.nameProject + 'admin/coursCommuns',
    comptabiliteCoursCommun : environment.host+ environment.nameProject + 'admin/comptabilite',
    comptabiliteParOrganisation : environment.host+ environment.nameProject + 'admin/comptabiliteParOrganistion',
    accepterMiseEnligneCourCommun : environment.host+ environment.nameProject + 'admin/accepterMiseEnligneCourCommun',
    refuserMiseEnLigneCourCommun : environment.host+ environment.nameProject + 'admin/refuserMiseEnLigneCourCommun',
    supprimerMiseEnligneCourCommun : environment.host+ environment.nameProject + 'admin/supprimerMiseEnligneCourCommun',
    allCoursCommunAdmin : environment.host+ environment.nameProject + 'admin/AllCoursCommun',
    recupererCoursCommunParId : environment.host+ environment.nameProject + 'particulier/detailCoursCommun',
    recupererCoursCommunForHomeParId : environment.host+ environment.nameProject + 'detailCoursCommun',

    detailsCoursCommunAdmin : environment.host+ environment.nameProject + 'admin/detailsCoursCommun',
    //Organisation
    recupererOrganisation : environment.host+ environment.nameProject + 'organisations',

    //InscriptionCoursCommun
    inscritptionCoursOrganise :  environment.host+ environment.nameProject +  'particulier/paiementinscription',
    inscriptioncourscommun : environment.host+ environment.nameProject + 'particulier/inscriptioncourscommun',
    inscriptionpubliccible : environment.host+ environment.nameProject + 'particulier/inscriptionpubliccible',
    recupererInscrit :  environment.host+ environment.nameProject + 'recupererinscrits',
    verifiedLastInscription :  environment.host+ environment.nameProject + 'particulier/verifiedLastInscription',



    //Contact us
    sendMessageContactUs :  environment.host+ environment.nameProject + 'enregistrerContact',
    getAllContactMessage :  environment.host+ environment.nameProject + 'admin/contacts',

}