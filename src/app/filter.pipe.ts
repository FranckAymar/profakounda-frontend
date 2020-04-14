import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(propositionFormations: any, valeur: any): any {
   if (valeur==null) return  propositionFormations;

   return propositionFormations.filter(function(propositionFormation){

    return propositionFormation.prenomParticulier.tolowercase();
   })
  }

}
