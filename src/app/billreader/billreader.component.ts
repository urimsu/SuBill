import { Component } from '@angular/core';
import { DatenService } from '../services/api-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billreader',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './billreader.component.html',
  styleUrl: './billreader.component.css'
})
export class BillreaderComponent {
  textInput:string = ''; // Beispiel für die zu sendenden Daten

  constructor(private datenService: DatenService) {}

  sendText(): void {
    const textData = { text: this.textInput };  // Verpacken des Textes als JSON-Objekt
    this.datenService.sendDaten(textData).subscribe(
      response => {
        console.log('Antwort von der API:', response);
      },
      error => {
        console.error('Fehler beim Senden der Daten', error);
      }
    );
  }
}
