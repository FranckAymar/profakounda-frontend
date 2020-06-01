export class PropositionFormation{
    constructor(public id:number,
                public description:string,
                public telephone:string,
                public descriptionHasModified:boolean,
                public username:string,
                public enLigne? : boolean,
                public attenteMiseEnLigne? : boolean,
                public refusMiseEnLigne? : boolean){
        
    }
}