import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouteradherentComponent } from './ajouteradherent.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AjouteradherentRoutingModule } from './ajouteradherent-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ToastModule} from "primeng/toast";


@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        AjouteradherentRoutingModule,
        ToastModule
    ],
    declarations: [AjouteradherentComponent]
})
export class AjouteradherentModule { }
