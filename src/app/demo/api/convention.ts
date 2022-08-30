export class Convention {
    referenceconv: string;
    idassoc: string;

    constructor()
    constructor(referenceconv?: string, idassoc?: string) {
        this.referenceconv = referenceconv ?? '';
        this.idassoc = idassoc ?? '';
    }
}
