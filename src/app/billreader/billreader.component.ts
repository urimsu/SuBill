import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetKundenDatenService } from '../services/get-kunden-daten.service';

@Component({
  selector: 'app-billreader',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './billreader.component.html',
  styleUrl: './billreader.component.css'
})
export class BillreaderComponent {
  kundenDaten:any;

  constructor(private datenService: GetKundenDatenService) {
    // this.loadKundenDaten() 
  }
  ngOnInit(){
    this.loadKundenDaten();
  }
  
  loadKundenDaten() {
    this.datenService.getData().subscribe(
      (data) => {
        this.kundenDaten = data;  // Abonniere und speichere die Daten
        console.log(data);        // Optional: Daten in der Konsole anzeigen
      },
      (error) => {
        console.error('Fehler beim Abrufen der Kundendaten', error);  // Fehlerbehandlung
      }
    );

  }
}
