import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable, { Cell } from 'jspdf-autotable'


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
  preis = 0;
  newPreis:number | undefined;

  newItem: string = '';
  
  rechnungsgrund:any[] = [];
  wordpressGrund=false;
  programmierGrund=false;
  beratungGrund=false;

  currentDate: Date = new Date();

  addItem() {
    if (this.newItem) {
      this.rechnungsgrund.push([this.newItem]);
      this.newItem = ''; // Eingabefeld leeren
      console.log(this.rechnungsgrund);
    }
  }

  getRechnungsPreis(rechnungsgrund: string){
    if(rechnungsgrund=='Wordpress'){
      this.preis=700;
    }else if(rechnungsgrund=='Programmiert'){
      this.preis=1200;
    }else{
      this.preis=150;
    }
    return this.preis;
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

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2); // Tag
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Monat (0-indexiert)
    const year = date.getFullYear(); // Jahr

    return `${day}.${month}.${year}`; // Formatierung: Tag/Monat/Jahr
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

      head: [[`SuTech | Urim | Sulejmani | Prießnitzstraße 7 | 65203 Wiesbaden`]],

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
        [`${this.vorname}`], 
        [`${this.nachname}`], 
        [`${this.strasse}`],
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
      body: [
        [`Internet: su-tech.org`], 
        [`Email: urim.sulejmani@su-tech.org`], 
        [`Telefon: 015759229559`],
        [`Steuernummer:`],
        [`Steuernummer folgt!`],
        [``],
        [`Datum: ${this.formatDate(this.currentDate)}`],
      ],
      styles:{
        halign:'right',
        cellPadding:0.1,
      },
      theme:'plain',
    })

    autoTable(doc,{
      head:[['Rechnungsnummer']],
      styles:{fontStyle: 'bold',
        halign:'center' 
      },
      theme:'plain',
    })
    
    autoTable(doc,{
      head:[[`für die Erledigung der von Ihnen beauftragen Tätigkeiten berechne ich Ihnen wie folgt`]],
    headStyles:{
      fontStyle:'normal',
    },
      styles:{
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0], // Textfarbe des Headers
      },
      theme:'grid',
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
    window.location.reload();

  }
}
