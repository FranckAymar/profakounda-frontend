import { Heure } from './heure.model';

export class Disponibilite{
    constructor(public jour:string,public heure:Heure[],public propositionFormationId:number,public username:string){

    }
}