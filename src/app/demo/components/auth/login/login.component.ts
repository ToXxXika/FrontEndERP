import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {QueryService} from "../../../service/query.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers:[MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    Mail!: string;

    constructor(private Message:MessageService,public layoutService: LayoutService,private queryService:QueryService,private Router:Router) { }

    login(){
        this.queryService.login(this.Mail,this.password).subscribe(data=>{
            if(data["authenticated"]==true){
                this.Message.add({key:'SS',severity:'success', summary:'Success', detail:'Bienvenue'});
                this.Router.navigate(['']);
            }



        },error=>{
            if(error["status"]==401){
                this.Message.add({key:'SS',severity:'error', summary:'Erreur', detail:'Mot de passe ou Email incorrecte'});
            }
        })
    }

}
