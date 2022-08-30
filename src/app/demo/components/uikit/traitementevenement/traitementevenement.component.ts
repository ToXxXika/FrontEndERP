import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import {QueryService} from "../../../service/query.service";
import {evenement} from "../../../api/evenement";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
    templateUrl: './traitementevenement.component.html',
    providers:[MessageService]
})
export class TraitementevenementComponent implements OnInit {

    products: Product[] = [];
    EventsArray:evenement[]=[];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];
    places: number =0;     progress: number=0;



    constructor(private queryService:QueryService,private productService: ProductService,private messageService:MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.queryService.getAllEvents().subscribe(data=>{
            this.EventsArray=data;
            console.log(this.EventsArray);
        })

    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        console.log(event);
        dv.filter((event.target as HTMLInputElement).value);
    }
    verification(e:any):boolean{
        console.log(e.detailevenementByDetails.places);
         return e.detailevenementByDetails.places <= 0;
         }

    uploadFile(event:any) {
        if (this.EventsArray.length > 0) {
            this.messageService.add({
                key: "SS",
                severity: 'error',
                summary: 'Erreur',
                detail: 'Vous ne pouvez pas importer deux fois le même fichier'
            });
        } else {
            this.progress = 0;
            if (event[0]) {
                const file: File | null = event[0];
                if (file) {
                    this.queryService.uploadEventFile(file).subscribe((event: any) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            this.progress = Math.round(100 * event.loaded / event.total);
                        } else if (event instanceof HttpResponse) {
                            this.messageService.add({
                                key: "SS",
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Fichier chargé dans la base de données ',
                                life: 3000
                            });
                        }
                    }, (error) => {
                        console.log(error);
                        if (error.error && error.error.message) {
                            this.messageService.add({
                                key: "SS",
                                severity: 'error',
                                summary: 'Error',
                                detail: error.error.message,
                                life: 3000
                            });
                        } else {
                            this.messageService.add({
                                key: "SS",
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Erreur de chargement',
                                life: 3000
                            });
                        }
                    });
                }
            }
        }
    }
}
