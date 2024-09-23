import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

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
  test = '';
  onSubmit() {
    this.test = `dies ist eine nachricht von ${this.vorname}, \n ${this.nachname},\n wohnhaft in ${this.strasse}\n ${this.plzUndOrt}.\n Rechnungsgrund: ${this.rechnungsgrund}`;
    console.log(this.test);
  }

  generatePDF() {
    // Erstelle eine neue jsPDF-Instanz
    const doc = new jsPDF();

    // Füge Text zum PDF hinzu
    doc.setFontSize(16);
    doc.text('Rechnung', 10, 10);

    doc.setFontSize(8);
    doc.text(' SuTech \n Urim Sulejmani\n Prießnitzstraße 7 \n 65203 Wiesbaden ', 150, 20);

    doc.setFontSize(12);
    doc.text(` ${this.vorname} \n ${this.nachname} \n ${this.strasse} \n ${this.plzUndOrt} \n `, 10, 50);
    


    // Füge noch mehr Text oder andere Inhalte hinzu
    doc.text(`Ihre Rechnung beinhaltet die Dienstleistung ${this.rechnungsgrund}`, 10, 90);

    // Speichere das PDF als Datei
    doc.save('Rechnung.pdf');
  }
}
