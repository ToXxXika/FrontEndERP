import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'ajouteradherent', loadChildren: () => import('./ajouteradherent/ajouteradherent.module').then(m => m.AjouteradherentModule) },
        { path: 'paiement', loadChildren: () => import('./paiement/paiement.module').then(m => m.PaiementModule) },
        { path: 'ajouterevenement', loadChildren: () => import('./ajouterevenement/ajouterevenement.module').then(m => m.AjouterevenementModule) },
        { path: 'traitementevenement', loadChildren: () => import('./traitementevenement/traitementevenement.module').then(m => m.TraitementevenementModule) },
        { path: 'facture', loadChildren: () => import('./facture/facture.module').then(m => m.FactureModule) },
    ])],
    exports: [RouterModule]
})
export class UikitRoutingModule { }
