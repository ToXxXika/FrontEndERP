 export  class Detailevenement{
    prix:number;
    places:number;
    localisation:string;
    promotion:number;
    datedebut:string;
    datefin:string;
    idetail:number;

     constructor() ;

     constructor(idetail?:number,prix?: number, places?: number, localisation?: string, promotion?: number, datedebut?: string, datefin?: string) {
        this.idetail = idetail ?? 0;
         this.prix = prix ?? 0;
        this.places = places ?? 0;
        this.localisation = localisation ?? "";
        this.promotion = promotion ?? 0 ;
        this.datedebut = datedebut ?? "";
        this.datefin = datefin ?? "";
    }

}
