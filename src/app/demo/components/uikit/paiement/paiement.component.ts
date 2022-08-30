import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {evenement} from "../../../api/evenement";
import {QueryService} from "../../../service/query.service";
import {utilisateur, utilisateur2} from "../../../api/utilisateur";
import {Logparticipation} from "../../../logparticipation";
// @ts-ignore
import * as html2pdf from "html2pdf.js";


@Component({
    templateUrl: './paiement.component.html',
    providers:[MessageService],
    styles:[`
        /*** @media all  ***/
        * {
            box-sizing: border-box;
        }
        html {
            height: 100%;
        }
        body {
            min-height: 100%;
            margin: 0;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: stretch;
            font: 12pt/1.5 'Raleway', 'Cambria', sans-serif;
            font-weight: 300;
            background: #fff;
            color: #666;
            -webkit-print-color-adjust: exact;
        }
        header {
            padding: 16px;
            position: relative;
            color: #888;
        }
        header h1,
        header h2 {
            font-weight: 200;
            margin: 0;
        }
        header h1 {
            font-size: 27pt;
            letter-spacing: 4px;
        }
        body > * {
            width: 100%;
            max-width: 7in;
            margin: 3px auto;
            background: #f0f0f0;
            text-align: center;
        }
        footer {
            padding: 16px;
        }
        footer p {
            font-size: 9pt;
            margin: 0;
            font-family: 'Nunito';
            color: #777;
        }
        section,
        table {
            padding: 8px 0;
            position: relative;
        }
        dl {
            margin: 0;
            letter-spacing: -4px;
        }
        dl dt,
        dl dd {
            letter-spacing: normal;
            display: inline-block;
            margin: 0;
            padding: 0px 6px;
            vertical-align: top;
        }
        dl.bloc > dt,
        dl:not(.bloc) dt:not(:last-of-type),
        dl:not(.bloc) dd:not(:last-of-type) {
            border-bottom: 1px solid #ddd;
        }
        dl:not(.bloc) dt {
            border-right: 1px solid #ddd;
        }
        dt {
            width: 49%;
            text-align: right;
            letter-spacing: 1px !important;
            overflow: hidden;
        }
        dd {
            width: 49%;
            text-align: left;
        }
        dd,
        tr>td {
            font-family: 'Nunito';
        }
        section.flex {
            display: flex;
            flex-flow: row wrap;
            padding: 8px 16px;
            justify-content: space-around;
        }
        dl.bloc {
            padding: 0;
            flex: 1;
            vertical-align: top;
            min-width: 240px;
            margin: 0 8px 8px;
        }
        dl.bloc>dt {
            text-align: left;
            width: 100%;
            margin-top: 12px;
        }
        dl.bloc>dd {
            text-align: left;
            width: 100%;
            padding: 8px 0 5px 16px;
            line-height: 1.25;
        }
        dl.bloc>dd>dl dt {
            width: 33%;
        }
        dl.bloc>dd>dl dd {
            width: 60%;
        }
        dl.bloc dl {
            margin-top: 12px;
        }
        dl.bloc dd {
            font-size: 11pt;
        }
        table {
            width: 100%;
            padding: 0;
            border-spacing: 0px;
        }
        table tr {
            margin: 0;
            padding: 0;
            background: #fdfdfd;
            border-right: 1px solid #ddd;
            width: 100%;
        }
        table tr td,
        table tr th {
            border: 1px solid #e3e3e3;
            border-top: 1px solid #fff;
            border-left-color: #fff;
            font-size: 11pt;
            background: #fdfdfd;
        }
        table thead th {
            background: #e9e9e9;
            background: linear-gradient(to bottom, #f9f9f9, #e9e9e9) !important;
            font-weight: 300;
            letter-spacing: 1px;
            padding: 15px 0 5px;
            /*&:not(:last-child)*/
            border: none !important;
        }
        table tbody tr:last-child td {
            border-bottom: 1px solid #ddd;
        }
        table tbody td {
            min-width: 75px;
            padding: 3px 6px;
            line-height: 1.25;
        }
        table tfoot tr td {
            /*border 1px solid #e3e3e3
                  border-top 1px solid white
                  border-left-color #fff*/
            height: 40px;
            padding: 6px 0 0;
            color: #000;
            text-shadow: 0 0 1px rgba(0,0,0,0.25);
            font-family: 'Cambria', 'Raleway', sans-serif;
            font-weight: 400;
            letter-spacing: 1px;
        }
        table tfoot tr td:first-child {
            font-style: italic;
            color: #997b7b;
        }
        a {
            color: #992c2c;
        }
        a:hover {
            color: #b00;
        }
        @page {
            margin: 0.5cm;
        }
        /*** @media screen  ***/
        html,
        body {
            background: #333231;
        }
        header:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            border-top: 12px solid #333;
            border-left: 12px solid #ddd;
            width: 0;
            box-shadow: 1px 1px 2px rgba(0,0,0,0.18);
        }
    `]
})
export class PaiementComponent implements OnInit {

    items:MenuItem[]=[];
    EventsArray:evenement[]=[]
    next: number=0;
    CinValue: String="";
    UserArray:utilisateur2[]=[]
    DialogDisplay:boolean=false;
    places:number=0;
    selectedEvent : any ;
    LogParticipation: Logparticipation = new Logparticipation();
    NomValue: any;
    submitted: boolean =false;
    PrenomValue: any;
    TextDisabled: boolean= false ;
    GeneratedRandomFacture: any;
    SystemDate: any;
    EmailValue: any;
    DescrptionEvenementValue: any;
    DateFin: any;
    DateDeb: any;
    constructor(private queryService:QueryService,private MessageService: MessageService) {
    }


    ngOnInit(): void {
        this.queryService.getAllEvents().subscribe(data=>{
            this.EventsArray=data;
        },error => {
            console.log(error)
        })
        this.queryService.getAllusers().subscribe(data=>{
            this.UserArray=data;
        },error=>{
            console.log(error)
        })
        this.items=[{
            label:'Informations Personels',
            icon:'pi pi-home',

        },
         {
            label:'Choisir un evenement',
            icon:'pi pi-info-circle',

        },{
            label:'Paiement',
            icon:'pi pi-envelope',

         }]

    }
    hideDiv(){
        let x = document.getElementById("divc") as HTMLDivElement;
        let y = document.getElementById("c1") as HTMLDivElement;
        if (x.style.display === "block") {
            x.style.display = "none";
            y.style.display = "block";
            this.next+=1;

        }else{
            x.style.display = "block";
        }
    }
    verification(e:any):boolean{
        return e.detailevenementByDetails.places <= 0;
    }
    generateFacture(){
        this.GeneratedRandomFacture=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        //get the system date and assign it to the system date variable
        this.SystemDate=new Date().toISOString().slice(0,10);
        this.DescrptionEvenementValue=this.selectedEvent["description"]
        //get date from the SelectedEvent and assign it to the date variable
        let dateDeb = this.selectedEvent["detailevenementByDetails"]["datedeb"]
        let dateFin = this.selectedEvent["detailevenementByDetails"]["datefin"]

        this.DateDeb=dateDeb;
        this.DateFin=dateFin;

        const options = {
            filename: 'Facture.pdf',
            image: { type: 'jpeg' },
            html2canvas: {},
            jsPDF: {orientation: 'landscape'}

        };
        const content = document.getElementById('element');
        html2pdf().from(content).set(options).save();
    }
    Participate(){
        let idutilisateur:number=0;
        let idevenement:number
        //loop into UserArray to find the user with the same cin
        for(let i=0;i<this.UserArray.length;i++){
            if(this.UserArray[i].cin==this.CinValue){
                idutilisateur=this.UserArray[i].id;
                break;
            }
        }
        idevenement=this.selectedEvent["idevent"]
        this.LogParticipation.idutilisateur=idutilisateur;
        this.LogParticipation.ideventfk=idevenement;
        this.LogParticipation.montantpaye=this.selectedEvent["detailevenementByDetails"]["prix"]*this.places;
        this.queryService.addLogParticipation(this.LogParticipation,this.places).subscribe(data=>{
            if(data){
                this.MessageService.add({severity:'success', summary:'Success', detail:'Vous avez bien participé'});
                this.generateFacture();

            }
        },error=>{
            this.MessageService.add({severity:'error', summary:'Error', detail:'Erreur de participation'});
        })
        this.DialogDisplay=false;

    }
    DialogState(event:any){
        this.DialogDisplay=true;
        this.selectedEvent=event;
    }
    testCin():boolean{
        for(let i=0;i<this.UserArray.length;i++){
            if(this.UserArray[i].cin==this.CinValue){
                this.PrenomValue=this.UserArray[i].prenom;
                this.NomValue=this.UserArray[i].nom;
                this.EmailValue=this.UserArray[i].mail;
                this.TextDisabled=true;
                this.MessageService.add({key:'SS',severity:'success', summary:'Success', detail:'Utilisateur dans La base de données'});
                return true;
            }
        }
        this.MessageService.add({key:'SS',severity:'error', summary:'Error', detail:'Utilisateur non dans La base de données'});
        return false;
    }


}


