import { Heure } from './heure.model';

export class Jour{
    constructor(id:number,public designation:string,public heure:Heure[]){}
}