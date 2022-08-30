import {Convention} from "./convention";

export class Associations {
   libelle: string;
   reference: string;
    conventionsByReference: Convention[];
   constructor() ;
   constructor(libelle?: string, reference?: string, conventionsByReference?: Convention[]) {
       this.libelle = libelle ?? '';
       this.reference = reference ?? '';
         this.conventionsByReference = conventionsByReference ?? [];
   }
}


