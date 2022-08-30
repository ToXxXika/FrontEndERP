import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AjouteradherentComponent } from './ajouteradherent.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AjouteradherentComponent }
    ])],
    exports: [RouterModule]
})
export class AjouteradherentRoutingModule { }
