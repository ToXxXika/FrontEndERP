import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TraitementevenementComponent } from './traitementevenement.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TraitementevenementComponent }
    ])],
    exports: [RouterModule]
})
export class TraitementevenementRoutingModule { }
