import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AjouterevenementComponent } from './ajouterevenement.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AjouterevenementComponent }
    ])],
    exports: [RouterModule]
})
export class AjouterevenementRoutingModule { }
