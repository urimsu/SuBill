import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetKundenDatenService } from '../services/get-kunden-daten.service';
import { DeleteDataService } from '../services/delete-data.service';


@Component({
  selector: 'app-billreader',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './billreader.component.html',
  styleUrl: './billreader.component.css'
})
export class BillreaderComponent {
  kundenDaten:any;
  daten:any;

  constructor(private datenService: GetKundenDatenService, private deleteDatenService:DeleteDataService) {
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
  handleClick(kunde: any) {
    const deleteKunde=kunde;
    const deleteData={kundennummer:deleteKunde[0]}
    this.deleteDatenService.deleteDaten(deleteData).subscribe(
      response => {
        console.log('Antwort von der API:', response);
      },
      error => {
        console.error('Fehler beim Senden der Loesch Daten', error);
      }
      )
      window.location.reload();
    //window.location.reload();


    }
}
