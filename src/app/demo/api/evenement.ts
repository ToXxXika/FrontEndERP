import {Detailevenement} from "./detailevenement";

export class evenement {
    refconv:string
    description: string
    codevenement: string
    details:number
    detailevenementByDetails: Detailevenement = new Detailevenement();
    constructor()
    constructor(refconv?: string, description?: string, codevenement?: string, details?: number) {
        this.refconv = refconv ?? "";
        this.description = description ?? "";
        this.codevenement = codevenement ?? "";
        this.details = details ?? 0;

    }
}
export class evenement2{
    refconv:string
    description: string
    codevenement: string
    details:number
    constructor()
    constructor(refconv?: string, description?: string, codevenement?: string, details?: number) {
        this.refconv = refconv ?? "";
        this.description = description ?? "";
        this.codevenement = codevenement ?? "";
        this.details = details ?? 0;

    }
}
