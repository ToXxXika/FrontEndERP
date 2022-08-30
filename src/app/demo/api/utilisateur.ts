export class utilisateur {
    nom:string
    prenom:string
    mail:string
    password:string
    cin:string
    constructor()

    //create a constructor
    constructor(nom?:string,prenom?:string,mail?:string,password?:string,cin?:string){
        this.nom=nom ?? "";
        this.prenom=prenom ?? "";
        this.mail=mail ?? "";
        this.password=password ?? "";
        this.cin=cin ?? "";
    }
}
export class utilisateur2{
    nom:string
    prenom:string
    mail:string
    password:string
    cin:string
    id:number
    constructor()
    constructor(id?:number,nom?:string,prenom?:string,mail?:string,password?:string,cin?:string){
        this.nom=nom ?? "";
        this.prenom=prenom ?? "";
        this.mail=mail ?? "";
        this.password=password ?? "";
        this.cin=cin ?? "";
        this.id=id ?? 0;
    }
}
