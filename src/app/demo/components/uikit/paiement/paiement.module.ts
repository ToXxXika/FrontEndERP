import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaiementRoutingModule } from './paiement-routing.module';
import { PaiementComponent } from './paiement.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {DataViewModule} from "primeng/dataview";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputNumberModule} from "primeng/inputnumber";

@NgModule({
    imports: [
        CommonModule,
        PaiementRoutingModule,
        ButtonModule,
        RippleModule,
        SplitButtonModule,
        ToggleButtonModule,
        ToastModule,
        StepsModule,
        CardModule,
        InputTextModule,
        DataViewModule,
        FormsModule,
        DialogModule,
        ConfirmDialogModule,
        InputNumberModule,
    ],
    declarations: [PaiementComponent]
})
export class PaiementModule { }
