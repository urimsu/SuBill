import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  vorname = '';
  nachname = '';
  strasse = '';
  plzUndOrt = '';
  rechnungsgrund = '';
  preis = 0;

  currentDate: Date = new Date();

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
      body:[
        [`${this.rechnungsgrund}`,`${this.getRechnungsPreis(this.rechnungsgrund)}€`]
        ],
        headStyles:{
          fillColor:[170,170,170],
          textColor:[0,0,0],
        }
    })

    doc.save('rechnung.pdf');

  }
}
