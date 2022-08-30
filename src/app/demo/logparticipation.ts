export class Logparticipation{
    idutilisateur:number;
    ideventfk:number;
    montantpaye:number;
    constructor()
    constructor(idutilisateur?:number,ideventfk?:number,montantpaye?:number){
        this.idutilisateur=idutilisateur ?? 0;
        this.ideventfk=ideventfk ?? 0;
        this.montantpaye=montantpaye ?? 0;
    }

}
