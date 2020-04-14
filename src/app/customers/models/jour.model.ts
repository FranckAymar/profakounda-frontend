import { Heure } from './heure.model';

export class Jour{
    constructor(public id:number,public designation:string,public heure:Heure[]){}
}