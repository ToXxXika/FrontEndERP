import {Component, OnInit} from '@angular/core';
import {CountryService} from 'src/app/demo/service/country.service';
import {QueryService} from "../../../service/query.service";
import {evenement, evenement2} from "../../../api/evenement";
import {Detailevenement} from "../../../api/detailevenement";
import {MessageService} from "primeng/api";
import {Convention} from "../../../api/convention";

@Component({
    templateUrl: './ajouterevenement.component.html',
    providers:[MessageService]
})
export class AjouterevenementComponent implements OnInit {

    countries: any[] = [];
    AssociationsArray: any[] = [];
    ReferenceConventionArray:any[]=[];

    filteredAssociation: any[] = [];

    ReferenceConventionValue: any;

    AssociationValue: any;

    CodeEventValue: any;

    LocalisationValue: any;

    DateDebValue: any;
    DateFinValue: any;
    PlacesValue: any;
    PrixValue: any;
    PromotionValue: any;
    DescriptionValue: any;

    constructor(private messageService:MessageService,private countryService: CountryService,private queryService:QueryService) {

    }

    ngOnInit() {
        this.CodeEventValue="E"+Math.floor(Math.random() * 200000);
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
        this.queryService.getAllAssociations().subscribe(data=>{
            data.forEach(element => {
               element.conventionsByReference.forEach((item: Convention)=>{
                     this.ReferenceConventionArray.push(item)
               })
            })
            this.AssociationsArray = data ;
        },error => {
            console.log(error)
        })

    }


    searchCountry(event: any) {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        const query = event.query;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.AssociationsArray.length; i++) {
            const Assoc = this.AssociationsArray[i];
            if (Assoc.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(Assoc);
            }
        }
        this.filteredAssociation = filtered;
        console.log(this.filteredAssociation)
    }
    AddEvent(){
        let E:evenement2 = new evenement2();
        let DE: Detailevenement = new Detailevenement();
        DE.prix= this.PrixValue;
        DE.places= this.PlacesValue;
        DE.datefin= this.DateFinValue;
        DE.datedebut= this.DateDebValue;
        DE.localisation= this.LocalisationValue;
        DE.promotion= this.PromotionValue;
        DE.idetail =  Math.floor(Math.random() * 9999);
        console.log("DE",DE);
        E.codevenement= this.CodeEventValue;
        E.description= this.DescriptionValue;
        E.refconv= this.ReferenceConventionValue.referenceconv;
        E.details=DE.idetail;
        console.log("E",E);

        this.queryService.addDetailEvent(DE).subscribe(data=>{

            if(data!=false){
                this.queryService.addevent(E).subscribe(data=>{
                    if (data!=false) {
                        this.messageService.add({
                            key: "SS",
                            severity: 'success',
                            summary: 'Success Message',
                            detail: 'Evenement ajouté avec succès'
                        });
                    }
                     },error => {
                    this.messageService.add({key:"SS",severity:'error', summary:'Error Message', detail:'Erreur lors de l\'ajout de l\'evenement'});
                    console.log(error)
                })
            }
        },error => {
            this.messageService.add({key:"SS",severity:'error', summary:'Error Message', detail:'Erreur lors de l\'ajout du detail de l\'evenement'});
            console.log(error)
        })


    }
}
