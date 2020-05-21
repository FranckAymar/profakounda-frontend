import { Niveau } from './../../admin/model/niveau.model';
export class publicCibleModel {

    constructor(
                public id? : number,
                public niveau? : any,
                public cout? : number,
                public formation? : Array<{}>,
                public filiere? : any,
                public nbreMaxInscrits? : number
                ) {} 
}