import { Component } from '@angular/core';
import {utilisateur} from "../../../api/utilisateur";
import {QueryService} from "../../../service/query.service";
import {MessageService} from "primeng/api";

@Component({
    templateUrl: './ajouteradherentcomponent.html',
    providers:[MessageService]
})
export class AjouteradherentComponent {

    selectedState: any;

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
     nom: string="";
    prenom: string="";
    email: string="";
    password: string="";
    cin:string="";
    constructor(private QueryService:QueryService,private MessageService:MessageService) { }

    AjouterAdherent() {
        window.alert("Test");
        //add an (utilisateur) to the database and return the result by Using QueryService
       let  u: utilisateur = new utilisateur();
       console.log(this.cin);
       u.nom=this.nom;
         u.prenom=this.prenom;
            u.mail=this.email;
            u.password=this.password;
            u.cin=this.cin;
            console.log(u);
        this.QueryService.addUser(u).subscribe(data => {
                if (data) {
                    this.MessageService.add({
                        key: 'custom',
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Utilisateur ajouté avec succès'
                    });
                }
            }, error => {
                if(error["status"]==200){
                    this.MessageService.add({
                        key: 'custom',
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Cin ou mail  déjà existant'
                    });
                }

            }
        )
    }
}


