import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {QueryService} from "../../service/query.service";
import { evenement } from '../../api/evenement';
import {Detailevenement} from "../../api/detailevenement";
import {Associations} from "../../api/associations";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    products!: Product[];
    evenements!: evenement[];
    DetailsDialog: boolean=false;
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    userCounter: number=0;
    eventCounter: number=0;
    AssociationCounter: number=0;
    Association:Associations[]=[];
    detail: Detailevenement = new Detailevenement();
    codeEvent:string="";

//************************** DETAIL EVENT ***********//
    prix:number=0;
    places:number=0;
    localisation:string="";
    promotion:number=0;
    datedebut:string="";
    datefin:string="";


    constructor(private productService: ProductService, public layoutService: LayoutService,private QueryService:QueryService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {

        });
    }

    ngOnInit() {

        this.productService.getProductsSmall().then(data => this.products = data);
        this.QueryService.getAllEvents().subscribe(data=>{
            this.evenements=data;
            this.eventCounter=data.length

        })
        this.QueryService.getAllusers().subscribe(data=>{
            //get the size of the array
            this.userCounter=data.length;
        })
        this.QueryService.getAllAssociations().subscribe(data=>{
            this.Association=data;
            this.AssociationCounter=data.length;
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            let ReferenceAssociations: string[]=[];
            let ConventionAssociations: number[]=[];
            this.Association.forEach(a=>{
                console.log(a.libelle + "AssociationTable :"+a.conventionsByReference.length)
                ConventionAssociations.push(a.conventionsByReference.length)
                ReferenceAssociations.push(a.libelle)
            });
            this.chartData = {
                labels: ReferenceAssociations,
                datasets: [
                    {
                        label: 'Conventions/Associations',
                        data: ConventionAssociations,
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                        borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                        tension: .4
                    }

                ]
            };
            this.chartOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
        })

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

    }

    findDetailbyCodeEvent(code:string):Detailevenement{
        this.evenements.forEach(e=>{
            if(e["codevenement"]==code){
              this.detail.prix=e["detailevenementByDetails"]["prix"]
                this.detail.places=e["detailevenementByDetails"]["places"]
                this.detail.localisation=e["detailevenementByDetails"]["localisation"]
                this.detail.promotion=e["detailevenementByDetails"]["promotion"]
                this.detail.datedebut=e["detailevenementByDetails"]["datedebut"]
                this.detail.datefin=e["detailevenementByDetails"]["datefin"]

            }
        },this)

           return this.detail;
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    hideDialog() {
        this.DetailsDialog = false;
    }
     openNew(code:any){
        let e:Detailevenement = this.findDetailbyCodeEvent(code)
        this.DetailsDialog = true;
        this.prix=e.prix;
        this.places=e.places;
        this.localisation=e.localisation;
        this.promotion=e.promotion;
        this.datedebut=e.datedebut;
        this.datefin=e.datefin;

    }


 }
