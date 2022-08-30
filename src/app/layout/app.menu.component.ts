import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Gestion des Données',
                items: [
                    {label: 'Gestion utilisateurs', icon: 'pi pi-fw pi-users', items: [
                            { label: ' Ajouter des Adherents', icon: 'pi pi-fw pi-user', routerLink: ['/Dev/ajouteradherent'] },
                            {
                                label: 'Traiter les adhérents',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/pages/crud']
                            },
                        ]},

                    { label: 'Gestion du Associations', icon: 'pi pi-fw pi-mobile', routerLink: ['/notfound'], class: 'rotated-icon' },
                    { label: 'Gestion Administratives', icon: 'pi pi-fw pi-folder-open', routerLink: ['/notfound'] },
                    { label: 'Gestion des évenements ', icon: 'pi pi-fw pi-bookmark',items: [
                            { label: 'Ajouter des évenements', icon: 'pi pi-fw pi-angle-right', routerLink: ['/Dev/ajouterevenement']},
                            { label: 'Traiter les évenements', icon: 'pi pi-fw pi-angle-right', routerLink: ['/Dev/traitementevenement'] },
                        ] },
                    { label: 'Gestion du Paiement', icon: 'pi pi-fw pi-credit-card', routerLink: ['/Dev/paiement'], class: 'rotated-icon' },

                ]
            },


        ];
    }
}
