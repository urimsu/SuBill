import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable, { Cell } from 'jspdf-autotable'
import { FirmenDatenService } from '../services/firmen-daten.service';
import { DatenService } from '../services/api-data.service';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  vorname = '';
  nachname = '';
  strasse = '';
  plzUndOrt = '';
  firma='';
  preis:number = 0;

  newPreis:number | undefined;
  newItem: string = '';
  
  rechnungsgrund:any[] = [];
  rechnungspreis:any[]=[];
  wordpressGrund=false;
  programmierGrund=false;
  beratungGrund=false;

  grundUndPreisMapList:any[]=[];

  currentDate: Date = new Date();
  rechnungsnummer: string=``;

  firmenDaten=inject(FirmenDatenService)

  constructor(private datenService: DatenService) {}

  addItem() {
    if (this.newItem) {
      this.rechnungsgrund.push([this.newItem,`${this.newPreis}€`]);
      if(this.newPreis!=undefined){
        this.preis+=this.newPreis;

      }
      this.newItem = ''; // Eingabefeld leeren
      this.newPreis=undefined;
    }
  }


  getRechnungsGrund(wordpress:Boolean,programmiert:Boolean,beratung:Boolean){
    if(wordpress){
      this.rechnungsgrund.push(['Erstellung einer Internetseite mit Wordpress',`${700}€`]);
      this.preis+=700;
    }
    if(programmiert){
      this.rechnungsgrund.push(['Erstellung einer Webseite programmiert',`${1200}€`]);
      this.preis+=1200;
    }
    if(beratung){
      this.rechnungsgrund.push(['Beratung zur Onlinepräsenz und/oder Webseite',`${150}€`]);
      this.preis+=150;
    }
    return this.rechnungsgrund;
  }


  generatePDF() {
  const doc = new jsPDF();


    autoTable(doc,{
      head:[['Rechnung']],
      styles:{
        valign:'top',
        halign:'center',
        fontSize:20,
      },
      theme:'plain',
    })


    autoTable(doc, {

      head: [this.firmenDaten.getFirmenDaten()],

      headStyles: {
        fillColor: [255, 255, 255],  // Hintergrundfarbe des Headers
        textColor: [0, 0, 0], // Textfarbe des Headers
        fontSize: 10 ,
      },
      theme:'striped',
    })

    autoTable(doc, {
      
      head: [[`Rechnungsträger`]],
      body: [
        [`${this.firma}`],
        [`${this.vorname}`], 
        [`${this.nachname}`], 
        [`${this.strasse}`],
        [`${this.plzUndOrt}`],
        // ...theme="plain",
      ],
      headStyles: {
        fillColor: [255, 255, 255],  // Hintergrundfarbe des Headers
        textColor: [0, 0, 0], // Textfarbe des Headers
        fontSize: 10 ,
      },
      styles:{
        halign:'left',
        cellPadding:0.1,
      },
      theme:'plain',
    })

    autoTable(doc,{
      body: 
        this.firmenDaten.getKontaktDaten(),
      styles:{
        halign:'right',
        cellPadding:0.1,
      },
      theme:'plain',
    })

    autoTable(doc,{
      head:[[`Rechnungsnummer: ${this.rechnungsnummer}`]],
      styles:{fontStyle: 'bold',
        halign:'center' 
      },
      theme:'plain',
    })
    
    autoTable(doc,{
      head:[[`für die Erledigung der von Ihnen beauftragen Tätigkeiten berechne ich Ihnen wie folgt`]],
      body:[[`Rechnungsdatum entspricht Leistungsdatum`]],
    headStyles:{
      fontStyle:'normal',
    },
    bodyStyles:{
      fontStyle:'italic',
    },
      styles:{
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0], // Textfarbe des Headers
      },
      theme:'plain',
    })
    autoTable(doc,{
      head:[['Bezeichnung','Preis']],
      body:
        this.getRechnungsGrund(this.wordpressGrund,this.programmierGrund,this.beratungGrund)
        ,
        headStyles:{
          fillColor:[170,170,170],
          textColor:[0,0,0],
        }
    })

    autoTable(doc,{
      head:[['Ihre Gesamtsumme beträgt',`${this.preis}€`]],
        headStyles:{
          fillColor:[170,170,170],
          textColor:[0,0,0],
        },
    })

    autoTable(doc,{
      head:[['Hinweis: Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird Umsatzsteuer nicht berechnet']],
        headStyles:{
          fillColor:[255,255,255],
          textColor:[0,0,0],
          fontSize:10,
          fontStyle:'italic',
        },
    })

    autoTable(doc,{
      head:[['Bitte überweisen Sie die oben genannte Summe zum nächstnöglichen Zeitpunkt an Folgende Adresse:']],
      body:[['Kontoinhaber: Urim Sulejmani'],['Iban: DE62 5087 0393 0070 8008 00'],['BIC: DEUTDEFFXXX'],[' '],['Mit freundlichen Grüßen'],[''],['Urim Sulejmani']],
      theme:'plain',
    })

    doc.save('rechnung.pdf');
    
    const toSendData = {firma:this.firma,
      vorname:this.vorname,
      nachname: this.nachname,
      strasse: this.strasse,
      plzUndOrt:this.plzUndOrt,
      rechnungsnummer: this.rechnungsnummer,
      rechnungsgrund:this.rechnungsgrund,
        }
    this.datenService.sendDaten(toSendData).subscribe(
      response => {
        console.log('Antwort von der API:', response);
      },
      error => {
        console.error('Fehler beim Senden der Daten', error);
      }
      )
    //window.location.reload();

  }
}
