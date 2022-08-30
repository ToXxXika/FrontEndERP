import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import {utilisateur} from "../../../api/utilisateur";
import {QueryService} from "../../../service/query.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Associations} from "../../../api/associations";

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    userDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    products: Product[] = [];
    product: Product = {};
    selectedProducts: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
     user : utilisateur[]=[]
    association:Associations[]=[];
    user1 : utilisateur= new utilisateur();
    rowsPerPageOptions = [5, 10, 20];
     progress: number=0;
    CsvDisabled: boolean=false

    constructor(private queryservice:QueryService,private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.queryservice.getAllusers().subscribe(data=>{
            this.user=data;
            if(this.user.length==0){
                this.CsvDisabled=true;
            }
            console.log(this.user);

        })


        this.cols = [
            { field: 'cin', header: 'cin' },
            { field: 'nom', header: 'nom' },
            { field: 'prenom', header: 'prenom' },
            { field: 'mail', header: 'mail' }

        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(u: utilisateur) {
        console.log(u)
        this.user1 = { ...u };
        this.userDialog = true;
    }

    deleteProduct(u: utilisateur) {
        this.deleteProductDialog = true;
        this.user1 = { ...u };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }
      uploadFile(event:any){
        console.log(event[0]);
        this.progress = 0 ;
        if (event[0]){
            const file : File | null = event[0];
            if(file){
                this.queryservice.uploadfile(file).subscribe((event:any)=>{
                    if(event.type === HttpEventType.UploadProgress){
                        this.progress = Math.round(100 * event.loaded / event.total);
                    } else if ( event instanceof  HttpResponse){
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'File Uploaded', life: 3000 });
                    }
                },(error)=>{
                    console.log(error);
                    if(error.error && error.error.message){
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur de chargement', life: 3000 });
                    }
                });
            }
        }
      }
    confirmDelete(u:utilisateur) {
        console.log(u.cin)
        this.queryservice.deleteUser(u.cin).subscribe(data=>{
            if(data!=null){
                this.deleteProductDialog = false;
                this.user = this.user.filter(val => val.cin !== this.user1.cin);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
                this.user1 = new utilisateur();
            }
        },error=>{
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur de suppression', life: 3000 });
        })

    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.userDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        console.log(event);
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
