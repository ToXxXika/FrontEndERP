import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FactureComponent } from './facture.component';
import { FactureRoutingModule } from './facture-routing.module';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
    imports: [
        CommonModule,
        FactureRoutingModule,
        FormsModule,
        TreeModule,
        TreeTableModule
    ],
    declarations: [FactureComponent],
})
export class FactureModule { }
