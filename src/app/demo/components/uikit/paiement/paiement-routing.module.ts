import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaiementComponent } from './paiement.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PaiementComponent }
    ])],
    exports: [RouterModule]
})
export class PaiementRoutingModule { }
