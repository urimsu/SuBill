import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirmenDatenService {

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2); // Tag
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Monat (0-indexiert)
    const year = date.getFullYear(); // Jahr

    return `${day}.${month}.${year}`; // Formatierung: Tag/Monat/Jahr
  }

  currentDate: Date = new Date();

  firmendaten=[`SuTech | Urim | Sulejmani | Prießnitzstraße 7 | 65203 Wiesbaden`]

  kontaktdaten=[
    [`Internet: su-tech.org`], 
  [`Email: urim.sulejmani@su-tech.org`], 
  [`Telefon: 0170 9059629`],
  [`Steuernummer:`],
  [`Steuernummer folgt!`],
  [``],
  [`Datum: ${this.formatDate(this.currentDate)}`]]

  getFirmenDaten(){
    return this.firmendaten;
  }

  getKontaktDaten(){
    return this.kontaktdaten;
  }
}
